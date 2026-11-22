function AccountPlaceholder({ title }) {
  return (
    <>
      <header className="account-heading">
        <h1>{title}.</h1>
        <p>This section is ready for future implementation.</p>
      </header>
      <section className="account-placeholder">
        <p>Your {title.toLowerCase()} will appear here.</p>
      </section>
    </>
  )
}

export default AccountPlaceholder
