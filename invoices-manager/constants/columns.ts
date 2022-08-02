export const columns = {
  invoices: [
    {
      name: '#',
      field: 'id',
    },
    {
      name: 'Client',
      field: 'client',
    },
    {
      name: 'Total',
      field: 'total',
    },
    {
      name: 'Issued date',
      field: 'issuedDate',
    },
    {
      name: 'Balance',
      field: 'balance',
    },
    {
      name: 'Actions',
      field: 'actions',
    },
  ],
  items: [
    {
      name: 'Item',
      field: 'item',
    },
    {
      name: 'Description',
      field: 'description',
    },
    {
      name: 'hours',
      field: 'hours',
    },
    {
      name: 'qty',
      field: 'qty',
    },
    {
      name: 'Total',
      field: 'total',
    },
  ],
  bill: [
    {
      name: '',
      field: 'label',
    },
    {
      name: '',
      field: 'value',
    },
  ],
}
