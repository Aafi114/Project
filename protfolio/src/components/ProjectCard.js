import React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <img src={project.image} alt={project.title} />
    </div>
  );
}

export default ProjectCard;