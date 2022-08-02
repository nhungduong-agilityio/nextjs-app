const itemsSelection = [
  'App Design',
  'App Customization',
  'ABC Template',
  'App Development',
]

const defaultBillInfo = [
  {
    label: 'Total Due:',
    value: '$12,110.55',
  },
  {
    label: 'Bank name:',
    value: 'American Bank',
  },
  {
    label: 'Country:',
    value: 'United States',
  },
  {
    label: 'IBAN:',
    value: 'ETD95476213874685',
  },
  {
    label: 'SWIFT code:',
    value: 'BR91905',
  },
]

const defaultItem = {
  key: 'item-1',
  item: 'App Design',
  description: '',
  hours: 0,
  qty: 0,
  total: 0,
}

const defaultInvoice = {
  address: '7777 Mendez Plains',
  company: 'Hall-Robbins PLC',
  companyEmail: 'don85@johnson.com',
  contact: '(616) 865-4180',
  name: 'Valerie Valdez',
  service: 'Unlimited Extended License',
  total: 0,
  discount: 28,
  tax: 0.21,
  items: [defaultItem],
}

const status = [
  'none',
  'Downloaded',
  'Draff',
  'Paid',
  'Past Due',
  'Partial Payment',
]

export { defaultInvoice, itemsSelection, defaultBillInfo, status, defaultItem }
