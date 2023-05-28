import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import FailureView from '../FailureView'
import ProjectCard from '../ProjectCard'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiFetchingConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProjectsShowcase extends Component {
  state = {
    category: categoriesList[0].id,
    status: apiFetchingConstants.initial,
    projects: [],
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({status: apiFetchingConstants.inProgress})
    const {category} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
    )
    if (response.ok) {
      const {projects} = await response.json()
      const data = projects.map(project => ({
        id: project.id,
        name: project.name,
        imageUrl: project.image_url,
      }))
      this.setState({status: apiFetchingConstants.success, projects: data})
    } else {
      this.setState({status: apiFetchingConstants.failure})
    }
  }

  changeCategory = e => {
    this.setState({category: e.target.value}, () => {
      this.getProjects()
    })
  }

  renderSuccessView = () => {
    const {projects} = this.state
    return (
      <ul className="project-container">
        {projects.map(project => (
          <ProjectCard projectDetails={project} key={project.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => <FailureView retryAgain={this.getProjects} />

  showProjects = () => {
    const {status} = this.state
    switch (status) {
      case apiFetchingConstants.success:
        return this.renderSuccessView()
      case apiFetchingConstants.inProgress:
        return this.renderLoadingView()
      case apiFetchingConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {category} = this.state
    return (
      <div>
        <div className="projects-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <div className="bottom-section">
          <select
            onChange={this.changeCategory}
            value={category}
            className="category-container"
          >
            {categoriesList.map(cat => (
              <option value={cat.id} key={cat.id}>
                {cat.displayText}
              </option>
            ))}
          </select>
          {this.showProjects()}
        </div>
      </div>
    )
  }
}

export default ProjectsShowcase
