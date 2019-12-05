import Sequelize from '../../config/sequelize';
import Projects from '../models/Projects';

class ProjectProfilesProductivityController {
    async show(req, res) {
        try {
            console.log(req.params.id)
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
                "     profile.description profile_description, " +
                "     software_profile.is_productive " +
                " FROM projects project " +
                " INNER JOIN activities activitie ON " + 
                "     activitie.project_id = project.id " + 
                " INNER JOIN users users ON " + 
                "     users.username = activitie.username " + 
                " INNER JOIN softwares software ON " + 
                "     software.process_name = activitie.softwares_id " +
                "  LEFT JOIN profiles profile ON " +
                "     profile.id = users.profile_id " +
                " LEFT JOIN softwares_profiles software_profile ON " + 
                "     software_profile.software_id = software.process_name " + 
            " AND software_profile.profile_id = users.profile_id " +
            " WHERE project.id = " + project.id +
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
            var profile = "";
            var profiles = {}
            
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
                
                profile = activities[n]['profile_description']
                
                //pega a diferença entre a atividade anterior e a atual
                horaDifAux = timeStamp.getTime() - horaAux
                
                if (!(profile in profiles)) {
                    profiles[profile] = {
                        horasProdutivas: 0,
                        horasImprodutivas : 0
                    }
                }
                
                if (produtivo){
                    profiles[profile]['horasProdutivas'] += horaDifAux
                } else {
                    profiles[profile]['horasImprodutivas'] += horaDifAux
                }
                
                //soma as horas totais para cálculo de porcentagem
                horasTotais += horaDifAux
                //atribui o usuário, data e hora da atividade atual para as variavéis auxiliares
                username = activities[n]['username']
                dataAux = activities[n]['date']
                horaAux = timeStamp.getTime()
                produtivo = activities[n]['is_productive']
            }
            
            //ajuste do formato de apresentação das horas
            for (var n in profiles){
                var auxProdutivas = 0;
                var auxImprodutivas = 0;
                
                auxProdutivas = profiles[n]['horasProdutivas']
                auxImprodutivas = profiles[n]['horasImprodutivas']
                profiles[n]['horasProdutivas'] = {
                    "label": msToTime(auxProdutivas),
                    "value": auxProdutivas
                }
                profiles[n]['horasImprodutivas'] = {
                    "label": msToTime(auxImprodutivas),
                    "value": auxImprodutivas
                }
            }
            
            const data = {
                project: project.id,
                profiles: profiles
            };
            return res.status(200).json(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "unable to show project productivity by profile."})
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

export default new ProjectProfilesProductivityController();
