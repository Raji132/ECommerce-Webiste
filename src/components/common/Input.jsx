function Input({ id, label, error, ...props }) {
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} aria-invalid={Boolean(error)} {...props} />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default Input
