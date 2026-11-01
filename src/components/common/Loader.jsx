import './Loader.css'

function Loader({ label = 'Loading', fullPage = false }) {
  if (fullPage) {
    return (
      <div className="loader-page" role="status" aria-live="polite">
        <span className="loader" aria-hidden="true" />
        <span className="loader-label">{label}</span>
      </div>
    )
  }

  return <span className="loader" role="status" aria-label={label} />
}

export default Loader
