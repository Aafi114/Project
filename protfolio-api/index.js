const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/protfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your projects
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

// Create a model based on the schema
const Project = mongoose.model('Project', projectSchema);

// API endpoints
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

app.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

// ... other API endpoints

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});