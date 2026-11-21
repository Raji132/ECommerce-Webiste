import skylineImage from '../../assets/images/9062b76dc21645cb357456380dbf236aa64f9583.jpg'
import porscheImage from '../../assets/images/183b86ba9b7783d8e8c3cf047ad82b14dc5984fd.png'

const skyline = {
  name: 'Nissan Skyline GT-R R34',
  brand: 'Mini GT',
  price: '₹1,299',
  image: skylineImage,
}

const porsche = {
  name: 'Porsche 911 GT3 RS',
  brand: 'Hot Wheels',
  price: '₹899',
  image: porscheImage,
}

export const orders = [
  {
    id: 'APX-10482',
    placed: '10 Nov 2026',
    status: 'In transit',
    expected: '13–15 November',
    payment: 'Paid via UPI',
    subtotal: '₹2,198',
    discount: '₹220',
    total: '₹1,978',
    items: [
      { ...skyline, name: 'Nissan Skyline GT-R R34', quantity: 1, tax: '18%', total: '₹1,299' },
      { ...porsche, quantity: 1, tax: '18%', total: '₹899' },
    ],
  },
  {
    id: 'APX-10336',
    placed: '24 Oct 2026',
    status: 'Delivered',
    payment: 'Paid via UPI',
    subtotal: '₹1,199',
    discount: '₹0',
    total: '₹1,199',
    items: [
      { ...skyline, name: 'Nissan Skyline GT-R R34', price: '₹1,199', quantity: 1, tax: '18%', total: '₹1,199' },
    ],
  },
  {
    id: 'APX-10184',
    placed: '08 Oct 2026',
    status: 'Delivered',
    payment: 'Paid via card',
    subtotal: '₹2,747',
    discount: '₹200',
    total: '₹2,547',
    items: [
      { ...skyline, quantity: 1, tax: '18%', total: '₹1,299' },
      { ...porsche, quantity: 1, tax: '18%', total: '₹899' },
      { ...skyline, name: 'Nissan Skyline GT-R R34 (Special Edition)', quantity: 1, tax: '18%', total: '₹549' },
    ],
  },
  {
    id: 'APX-10028',
    placed: '19 Sep 2026',
    status: 'Refunded',
    payment: 'Refunded to original payment method',
    subtotal: '₹649',
    discount: '₹0',
    total: '₹649',
    items: [
      { ...porsche, name: 'Porsche 911 GT3 RS', price: '₹649', quantity: 1, tax: '18%', total: '₹649' },
    ],
  },
  {
    id: 'APX-09874',
    placed: '02 Sep 2026',
    status: 'Delivered',
    payment: 'Paid via UPI',
    subtotal: '₹1,299',
    discount: '₹100',
    total: '₹1,199',
    items: [
      { ...skyline, quantity: 1, tax: '18%', total: '₹1,299' },
    ],
  },
  {
    id: 'APX-09742',
    placed: '18 Aug 2026',
    status: 'Delivered',
    payment: 'Paid via card',
    subtotal: '₹899',
    discount: '₹0',
    total: '₹899',
    items: [
      { ...porsche, quantity: 1, tax: '18%', total: '₹899' },
    ],
  },
  {
    id: 'APX-09510',
    placed: '04 Aug 2026',
    status: 'Cancelled',
    payment: 'Payment refunded',
    subtotal: '₹1,299',
    discount: '₹0',
    total: '₹1,299',
    items: [
      { ...skyline, quantity: 1, tax: '18%', total: '₹1,299' },
    ],
  },
  {
    id: 'APX-09382',
    placed: '21 Jul 2026',
    status: 'Delivered',
    payment: 'Paid via UPI',
    subtotal: '₹1,798',
    discount: '₹100',
    total: '₹1,698',
    items: [
      { ...skyline, quantity: 1, tax: '18%', total: '₹1,299' },
      { ...porsche, price: '₹499', quantity: 1, tax: '18%', total: '₹499' },
    ],
  },
]

export function getOrder(orderId) {
  return orders.find((order) => order.id === orderId)
}
