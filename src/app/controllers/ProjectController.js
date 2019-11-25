import Projects from '../models/Projects';
import User from '../models/User';

class ProjectsController {
  async index(req, res) {
    const projects = await Projects.findAll();

    return res.json(projects);
  }

  async show(req, res) {
    const { id } = req.params;

    const project = await Projects.findOne({ where: { id } });

    return res.json(project);
  }

  async store(req, res) {
    const { title } = req.body;

    const projectExists = await Projects.findOne({
      where: {
        title,
      },
    });

    if (projectExists) {
      return res
        .status(400)
        .json({ error: `Project ${projectExists.title} already exists` });
    }

    const project = await Projects.create(req.body);

    return res.json(project);
  }

  async update(req, res) {
    const { id } = req.params;

    const project = await Projects.findByPk(id);

    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    const { name, time } = await project.update(req.body);

    return res.json({ id, name, time });
  }

  async delete(req, res) {
    const { id } = req.params;

    const dbResponse = await Projects.destroy({ where: { id } });

    if (!dbResponse) {
      return res.status(400).json({ error: 'Delete error' });
    }
    return res.json({ ok: true });
  }

  async indexUsers(req, res) {
    const project_id = req.params.id;

    const project = await Projects.findByPk(project_id);

    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }

    const usersByProject = await User.findAll({
      attributes: [
        'username',
        'name',
        'email',
        'project_id',
        'profile_id',
        'disabled_at',
      ],
      where: {
        project_id,
      },
    });

    if (!usersByProject) {
      return res
        .status(400)
        .json({ error: `There are no users for project ${project.title}.` });
    }

    return res.json(usersByProject);
  }
}

export default new ProjectsController();
