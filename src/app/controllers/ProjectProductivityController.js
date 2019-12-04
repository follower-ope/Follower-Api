import Sequelize from '../../config/sequelize';
import Projects from '../models/Projects';

class ProjectProductivityController {
    async show(req, res) {

        var project = await Projects.findOne({
            where: {id: req.params.id},
        });

        if (!project){
            return res.status(400).json("Projeto não encontrado na base de dados!")
        }

        //Produtividade por projeto.
        const ProjectActivities = await Sequelize.query(
            " SELECT " +
            "     project.id, " +
            "     project.title, " +
            "     project.time, " +
            "     users.username, " +
            "     Date(activitie.time) date, " +
            "     activitie.time time_stamp, " +
            "     software_profile.is_productive " +
            " FROM projects project " +
            " INNER JOIN activities activitie ON " +
            "     activitie.project_id = project.id " +
            " INNER JOIN users users ON " +
            "     users.username = activitie.username " +
            " INNER JOIN softwares software ON " +
            "     software.process_name = activitie.softwares_id " +
            " LEFT JOIN softwares_profiles software_profile ON " +
            "     software_profile.software_id = software.process_name " +
            " AND software_profile.profile_id = users.profile_id " +
            " WHERE project.id =  project.id " +
            " ORDER BY activitie.username,  activitie.time ");

        var horasProdutivas = 0;
        var horasImprodutivas = 0;
        var dataAux = "";
        var horaAux = 0;
        var horaDifAux = 0;
        var horasTotais = 0;
        var produtivo = "";
        var activities = ProjectActivities[0]
        var username = "";

        for (var n in activities) {
            var timeStamp = new Date(activities[n]['time_stamp'])
            //retira o fuso
            timeStamp = new Date(timeStamp.valueOf() - timeStamp.getTimezoneOffset() * 60000)

            if (activities[n]['date'] != dataAux || activities[n]['username'] != username){
                username = activities[n]['username']
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
            //atribui o usuário, data e hora da atividade atual para as variavéis auxiliares
            username = activities[n]['username']
            dataAux = activities[n]['date']
            horaAux = timeStamp.getTime()
            produtivo = activities[n]['is_productive']
        }

        const data = {
                project: project.id,
                duration: project.time,
                totalHoursSpent: msToTime(horasTotais),
                productiveHours: msToTime(horasProdutivas),
                unproductiveHours: msToTime(horasImprodutivas)
        };
        return res.status(200).json(data)
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

export default new ProjectProductivityController();
