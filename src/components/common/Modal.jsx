function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" aria-label="Close modal" onClick={onClose}>×</button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
