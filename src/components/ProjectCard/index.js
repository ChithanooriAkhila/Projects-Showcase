import './index.css'

const ProjectCard = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails

  return (
    <li className="project-card">
      <img src={imageUrl} alt={name} className="project-image" />
      <div className="text-container">
        <p>{name}</p>
      </div>
    </li>
  )
}

export default ProjectCard
