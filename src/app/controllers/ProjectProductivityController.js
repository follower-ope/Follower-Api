import Sequelize from '../../config/sequelize';
import Projects from '../models/Projects';

class ProjectProductivityController {
    async show(req, res) {
        try{
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
                " WHERE project.id =  " + project.id +
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
                totalHoursSpent: {
                    "label": msToTime(horasTotais),
                    "value": horasTotais
                },
                productiveHours: {
                    "label": msToTime(horasProdutivas),
                    "value": horasProdutivas
                },
                unproductiveHours: {
                    "label": msToTime(horasImprodutivas),
                    "value": horasImprodutivas
                }
            };
            return res.status(200).json(data)
        } catch (err){
            return res.status(500).json({ error: "unable to show project productivity." })
        }
    }

    async productivityByDay(req, res) {
        try{
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
                " WHERE project.id =  " + project.id +
                "   AND DATE(activitie.time) BETWEEN '" + req.body.startDate + "' AND '" + req.body.endDate + "' " +
                " ORDER BY activitie.username,  activitie.time ");

            var dataAux = "";
            var horaAux = 0;
            var horaDifAux = 0;
            var horasTotais = 0;
            var produtivo = "";
            var activities = ProjectActivities[0]
            var username = "";
            var date = ""
            var dates = {}

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

                date = activities[n]['date']

                if (!(date in dates)) {
                    dates[date] = {
                        horasProdutivas: 0,
                        horasImprodutivas : 0
                    }
                }

                //pega a diferença entre a atividade anterior e a atual
                horaDifAux = timeStamp.getTime() - horaAux

                if (produtivo){
                    dates[date]['horasProdutivas'] += horaDifAux
                } else {
                    dates[date]['horasImprodutivas'] += horaDifAux
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
            for (var n in dates){
                var auxProdutivas = 0;
                var auxImprodutivas = 0;

                auxProdutivas = dates[n]['horasProdutivas']
                auxImprodutivas = dates[n]['horasImprodutivas']
                dates[n]['horasProdutivas'] = {
                    "label": msToTime(auxProdutivas),
                    "value": auxProdutivas
                }
                dates[n]['horasImprodutivas'] = {
                    "label": msToTime(auxImprodutivas),
                    "value": auxImprodutivas
                }
            }

            const data = {
                project: project.id,
                duration: project.time,
                dates: dates
            };
            return res.status(200).json(data)
        } catch (err){
            return res.status(500).json({ error: "unable to show project productivity by day." })
        }
    }

    async index(req, res) {
        try{
            //Produtividade por projeto.
            const ProjectActivities = await Sequelize.query(
                " SELECT " +
                "     project.id, " +
                "     project.title, " +
                "     project.description, " +
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

            var dataAux = "";
            var horaAux = 0;
            var horaDifAux = 0;
            var produtivo = "";
            var activities = ProjectActivities[0];
            var username = "";
            var projetos = {};
            var projeto = "";

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

                projeto = activities[n]['id']

                if (!(projeto in projetos)) {
                    projetos[projeto] = {
                        title: activities[n]['title'],
                        activities[n]['description'],
                        duracao: {
                            "label": msToTime(activities[n]['time'] * 3600000),
                            "value": activities[n]['time'] * 3600000
                        },
                        horasProdutivas: 0,
                        horasImprodutivas : 0,
                        horasTotais: 0
                    }
                }

                //pega a diferença entre a atividade anterior e a atual
                horaDifAux = timeStamp.getTime() - horaAux

                if (produtivo){
                    projetos[projeto]['horasProdutivas'] += horaDifAux
                } else {
                    projetos[projeto]['horasImprodutivas'] += horaDifAux
                }

                //soma as horas totais para cálculo de porcentagem
                projetos[projeto]['horasTotais'] += horaDifAux
                console.log("projeto: " + projeto)
                console.log("horasTotais: " + projetos[projeto]['horasTotais'])

                //atribui o usuário, data e hora da atividade atual para as variavéis auxiliares
                username = activities[n]['username']
                dataAux = activities[n]['date']
                horaAux = timeStamp.getTime()
                produtivo = activities[n]['is_productive']
            }

            //ajuste do formato de apresentação das horas
            for (var n in projetos){
                var auxProdutivas = 0;
                var auxImprodutivas = 0;
                var auxTotais = 0;

                auxProdutivas = projetos[n]['horasProdutivas']
                auxImprodutivas = projetos[n]['horasImprodutivas']
                auxTotais = projetos[n]['horasTotais']
                projetos[n]['horasProdutivas'] = {
                    "label": msToTime(auxProdutivas),
                    "value": auxProdutivas
                }
                projetos[n]['horasImprodutivas'] = {
                    "label": msToTime(auxImprodutivas),
                    "value": auxImprodutivas
                }
                projetos[n]['horasTotais'] = {
                    "label": msToTime(auxTotais),
                    "value": auxTotais
                }
            }
            return res.status(200).json(projetos)
        } catch (err){
            return res.status(500).json({ error: "unable to show project productivity." })
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

export default new ProjectProductivityController();
