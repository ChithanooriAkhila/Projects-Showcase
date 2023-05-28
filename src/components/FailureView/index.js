import './index.css'

const FailureView = props => {
  const {retryAgain} = props

  const tryAgain = () => {
    retryAgain()
  }

  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
        className="not-found-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={tryAgain} className="retry-button">
        Retry
      </button>
    </div>
  )
}

export default FailureView
