export const ENDPOINTS = {
    contacts: {
        index: 'contacts',
        show: 'contacts/show',
        store: 'contacts',
        delete: 'contacts'
    },
    phones: {
        store: 'phones',
        update: 'phones/update',
        delete: 'phones/delete'
    },
    emails: {
        update: 'emails/update',
        delete: 'emails/delete'
    },
    addresses: {
        update: 'addresses/update',
        delete: 'addresses/delete'
    }
}

Object.freeze(ENDPOINTS);