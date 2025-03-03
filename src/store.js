export const initialStore = () => {
  return {
    contacts: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };

    case 'get_data':
      const contacts = Array.isArray(action.payload)
        ? action.payload
        : action.payload.contacts || [];
      return {
        ...store,
        contacts: contacts
      };
    
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    default:
      throw Error('Unknown action.');
  }
}
