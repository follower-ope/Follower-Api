import Sequelize from '../../config/sequelize';
import User from "../models/User";

class UsersActivitiesController {
  async index(req, res) {
    try{
      var sequelize = require('sequelize');

      var user = await User.findOne({
        where: {username: req.body.username},
      });
      
      if (!user){
        return res.status(400).json("Usuario nao encontrado na base de dados!")
      }
      
      //produtividade por usuario
      //De x tempo quantos % foi produtivo
      const UsersActivities = await Sequelize.query(
        " SELECT  Date(atv.time) date, " +
        "         atv.time time_stamp, " +
        "         u.username, " +
        "         sp.is_productive " +
        " FROM activities As atv " +
        " INNER JOIN softwares s ON " +
        " s.process_name = atv.softwares_id " +
        " INNER JOIN users u on " +
        " u.username = atv.username " +
        " LEFT JOIN softwares_profiles sp ON " +
        " sp.software_id = s.process_name AND sp.profile_id = u.profile_id " +
        " WHERE atv.username = '" + req.body.username + "' " +
        " and DATE(atv.time) BETWEEN '" + req.body.startDate + "' AND '" + req.body.endDate + "' " +
        " ORDER BY atv.time ");
        
      var horasProdutivas = 0;
      var horasImprodutivas = 0;
      var dataAux = "";
      var horaAux = 0;
      var horaDifAux = 0;
      var horasTotais = 0;
      var produtivo = "";
      var activities = UsersActivities[0]
      
      if (activities.length == 0){
        return res.status(200).json({})
      }
      
      for (var n in activities) {
        var timeStamp = new Date(activities[n]['time_stamp'])
        //retira o fuso
        timeStamp = new Date(timeStamp.valueOf() - timeStamp.getTimezoneOffset() * 60000)
        
        //se for a 1a execução a variavel dataAux estará nula,
        //atribui os valores para a próxima iteração
        //se não houver datas iguais não realiza a somatória
        if (activities[n]['date'] != dataAux){
          dataAux = activities[n]['date']
          horaAux = timeStamp.getTime()
          produtivo = activities[n]['is_productive']
          continue;
        }
        
        //pega a diferença entre a atividade anterior e a atual
        horaDifAux = timeStamp.getTime() - horaAux
        
        if (produtivo){
          horasProdutivas += horaDifAux
        } else {
          horasImprodutivas += horaDifAux
        }
        //soma as horas totais para cálculo de porcentagem
        horasTotais += horaDifAux
        //atribui a data e hora da atividade atual para as auxiliares
        dataAux = activities[n]['date']
        horaAux = timeStamp.getTime()
        produtivo = activities[n]['is_productive']
      }
      const data = {
        username: req.body.username,
        horasTotais: {
          "label": msToTime(horasTotais),
          "value": horasTotais
        },
        horasProdutivas: {
          "label": msToTime((horasProdutivas)),
          "value": horasProdutivas
        },
        horasImprodutivas: {
          "label": msToTime((horasImprodutivas)),
          "value": horasImprodutivas
        }
      };
      return res.status(200).json(data)
    } catch(err){
      return res.status(500).json({ error: "unable to get user activities" })
    }
  }
}

function msToTime(duration) {
  var seconds = parseInt((duration / 1000) % 60)
      , minutes = parseInt((duration / (1000 * 60)) % 60)
      , hours = parseInt((duration / (1000 * 60 * 60)));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export default new UsersActivitiesController();
