
const Project = require("../models/projectform");

const addProject = async (req, res, next) => {
  console.log(req.body)
  try {
    const {
        application_name,
        developers,
        app_url,
        db_name,
        status
    } = req.body;

    const newProject = new Project({
        application_name,
        developers,
        app_url,
        db_name,
        status
    });

    await newProject.save();

    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Failed to add project' });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteProject = async (req, res) => {
  const _id=req.params.id
  try {
    const project = await Project.findByIdAndDelete({_id});
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 const updateProject=async (req, res, next)=>{
  const _id = req.params.id
  const {
  application_name,
  developers,
  app_url,
  db_name,
  status} = req.body;
  let prodata;
  try{
      prodata = await Project.findByIdAndUpdate(_id,{
        application_name,
        developers,
        app_url,
        db_name,
        status
      });
  }catch(err){
      return console.log(err)
  }
  if(!prodata){
      return res.status(400).json({message:"Unable to update the users."})
  }
  return res.status(200).json({prodata})
}

const getDevelopers = async (req, res) => {
  try {
    const projects = await Project.find();
    console.log("Projects:", projects);

    const developersMap = new Map();

    projects.forEach(project => {
      if (Array.isArray(project.developers)) {
        project.developers.forEach(developer => {
          if (developersMap.has(developer)) {
            developersMap.set(developer, developersMap.get(developer) + 1);
          } else {
            developersMap.set(developer, 1);
          }
        });
      } else if (typeof project.developers === 'string') {
        // Convert the string to an array of developers
        const developersArray = project.developers.split(',').map(developer => developer.trim());
        developersArray.forEach(developer => {
          if (developersMap.has(developer)) {
            developersMap.set(developer, developersMap.get(developer) + 1);
          } else {
            developersMap.set(developer, 1);
          }
        });
      } else {
        console.log("Invalid developers array:", project.developers);
      }
    });

    const developers = [...developersMap.entries()].map(([developer, count]) => ({
      developer,
      count
    }));

    console.log("Developers:", developers);
    res.json(developers);
  } catch (err) {
    console.error("Error fetching developers:", err);
    res.status(500).json({ message: "Failed to fetch developers" });
  }
};
exports.addProject = addProject;
exports.getProject = getProject;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
exports.getDevelopers = getDevelopers;




