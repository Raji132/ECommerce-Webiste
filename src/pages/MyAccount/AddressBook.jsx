import { useCallback, useState } from 'react'
import Modal from '../../components/common/Modal.jsx'

const initialAddresses = [
  {
    id: 'home',
    label: 'Home',
    name: 'Arjun Mehta',
    phone: '+91 98765 43210',
    street: '42, Palm Grove, Indiranagar',
    city: 'Bengaluru',
    postalCode: '560038',
    state: 'Karnataka',
    isDefault: true,
  },
  {
    id: 'office',
    label: 'Office',
    name: 'Arjun Mehta',
    phone: '+91 98765 43210',
    street: 'Waverly Galaxy, Residency Road',
    city: 'Bengaluru',
    postalCode: '560025',
    state: 'Karnataka',
    isDefault: false,
  },
]

const emptyAddress = {
  name: '',
  phone: '',
  street: '',
  city: '',
  postalCode: '',
  state: '',
  isDefault: false,
}

function AddressBook() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyAddress)

  const closeModal = useCallback(() => setIsModalOpen(false), [])

  function openAddModal() {
    setEditingId(null)
    setForm({ ...emptyAddress, isDefault: addresses.length === 0 })
    setIsModalOpen(true)
  }

  function openEditModal(address) {
    setEditingId(address.id)
    setForm({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      state: address.state,
      isDefault: address.isDefault,
    })
    setIsModalOpen(true)
  }

  function updateField(event) {
    const { name, value, checked, type } = event.currentTarget
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function saveAddress(event) {
    event.preventDefault()

    const addressId = editingId || `address-${Date.now()}`
    const existingAddress = addresses.find((address) => address.id === editingId)
    const nextAddress = {
      ...form,
      id: addressId,
      label: existingAddress?.label || (addresses.length === 0 ? 'Home' : `Address ${addresses.length + 1}`),
    }
    let updatedAddresses = editingId
      ? addresses.map((address) => address.id === editingId ? nextAddress : address)
      : [...addresses, nextAddress]
    const hasOtherDefault = updatedAddresses.some((address) =>
      address.id !== addressId && address.isDefault
    )

    if (form.isDefault || !hasOtherDefault) {
      updatedAddresses = updatedAddresses.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      }))
    }

    setAddresses(updatedAddresses)
    closeModal()
  }

  function removeAddress(addressId) {
    const addressToRemove = addresses.find((address) => address.id === addressId)
    if (!window.confirm(`Remove the ${addressToRemove.label.toLowerCase()} address?`)) return

    let remainingAddresses = addresses.filter((address) => address.id !== addressId)
    if (addressToRemove.isDefault && remainingAddresses.length > 0) {
      remainingAddresses = remainingAddresses.map((address, index) => ({
        ...address,
        isDefault: index === 0,
      }))
    }
    setAddresses(remainingAddresses)
  }

  return (
    <>
      <header className="account-heading">
        <h1>Your addresses.</h1>
        <p>Make sure every new addition finds its way home.</p>
      </header>

      <section className="address-book" aria-label="Saved addresses">
        {addresses.map((address) => (
          <article className="address-card" key={address.id}>
            <p className={address.isDefault ? 'address-card__label is-default' : 'address-card__label'}>
              {address.label}{address.isDefault ? ' · Default' : ''}
            </p>
            <h2>{address.name}</h2>
            <address>
              {address.street}<br />
              {address.city}, {address.state} {address.postalCode}
            </address>
            <p className="address-card__phone">{address.phone}</p>
            <div className="address-card__actions">
              <button type="button" onClick={() => openEditModal(address)}>Edit address</button>
              <button type="button" onClick={() => removeAddress(address.id)}>Remove</button>
            </div>
          </article>
        ))}
      </section>

      <button className="address-add-button" type="button" onClick={openAddModal}>
        + Add new address
      </button>

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit address' : 'Add a new address'}
        onClose={closeModal}
      >
        <form className="address-form" onSubmit={saveAddress}>
          <label className="address-form__field address-form__field--full">
            <span>Full name</span>
            <input autoComplete="name" autoFocus name="name" onChange={updateField} required value={form.name} />
          </label>
          <label className="address-form__field address-form__field--full">
            <span>Phone number</span>
            <input autoComplete="tel" name="phone" onChange={updateField} required type="tel" value={form.phone} />
          </label>
          <label className="address-form__field address-form__field--full">
            <span>Street address</span>
            <input autoComplete="street-address" name="street" onChange={updateField} required value={form.street} />
          </label>
          <label className="address-form__field">
            <span>City</span>
            <input autoComplete="address-level2" name="city" onChange={updateField} required value={form.city} />
          </label>
          <label className="address-form__field">
            <span>Postal code</span>
            <input autoComplete="postal-code" name="postalCode" onChange={updateField} required value={form.postalCode} />
          </label>
          <label className="address-form__field address-form__field--full">
            <span>State</span>
            <select autoComplete="address-level1" name="state" onChange={updateField} required value={form.state}>
              <option value="">Select a state</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Delhi">Delhi</option>
            </select>
          </label>
          <label className="address-form__default address-form__field--full">
            <input checked={form.isDefault} name="isDefault" onChange={updateField} type="checkbox" />
            <span>Set as default address</span>
          </label>
          <button className="address-form__submit address-form__field--full" type="submit">
            Save address
          </button>
        </form>
      </Modal>
    </>
  )
}

export default AddressBook
