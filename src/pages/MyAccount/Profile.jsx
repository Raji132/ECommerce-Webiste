import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../../components/common/Button.jsx'
import '../../components/common/Button.css'

function Profile() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  function handleSave(event) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <>
      <header className="account-heading">
        <h1>Your profile.</h1>
        <p>A few details about the collector behind the collection.</p>
      </header>

      <form className="profile-form" onSubmit={handleSave}>
        <div className="profile-form__grid">
          <label>
            <span>Full name</span>
            <input defaultValue={user?.name || ''} placeholder="Your name" />
          </label>
          <label>
            <span>Email address</span>
            <input type="email" defaultValue={user?.email || ''} placeholder="you@example.com" />
          </label>
          <label>
            <span>Mobile number</span>
            <input type="tel" placeholder="+91 98765 43210" />
          </label>
          <label>
            <span>Birthday (optional)</span>
            <input placeholder="DD Month YYYY" />
          </label>
        </div>

        <fieldset className="profile-form__preferences">
          <legend>Collecting preferences</legend>
          <label><input type="checkbox" defaultChecked /> JDM legends</label>
          <label><input type="checkbox" defaultChecked /> Mini GT</label>
          <label><input type="checkbox" /> Race cars</label>
          <label><input type="checkbox" defaultChecked /> 1:64 scale</label>
        </fieldset>

        <div className="profile-form__newsletter">
          <input type="checkbox" defaultChecked /> Email me about new drops and restocks
        </div>

        <div className="profile-form__actions">
          <Button type="submit" variant="primary">Save changes</Button>
          <Button type="button" variant="dark">Change password</Button>
        </div>
        {saved && <p className="profile-form__success" role="status">Profile changes saved.</p>}
      </form>
    </>
  )
}

export default Profile
