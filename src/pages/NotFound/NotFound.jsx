import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="page-placeholder">
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  )
}

export default NotFound
