import {CONTACT} from './types';
import ContactListDB from '../../db/contactList';
import {store} from '../../store';

export const writeContactsInDB = (realm, contacts) => {
  return new Promise((resolve, reject) => {
    ContactListDB.writeContacts(realm, contacts)
      .then((res) => {
        store.dispatch({
          type: CONTACT.GET_CONTACT_LIST,
          payload: contacts,
        });
        resolve(res);
      })
      .catch((error) => {
        console.log('writeContactsInDB error: ', error);
        reject(error);
      });
  });
};

export const updateContactsInDB = (realm, user_id, contacts) => {
  return (dispatch) => {
    ContactListDB.updateContacts(realm, contacts)
      .then((res) => {
        getContactsFromDB(realm, user_id);
      })
      .catch((error) => {
        console.log('writeContactsInDB error: ', error);
      });
  };
};

export const getContactsFromDB = (realm, user_id) => {
  return (dispatch) => {
    ContactListDB.getContactsFromDB(realm, user_id).then((res) => {
      dispatch({
        type: CONTACT.GET_CONTACT_LIST,
        payload: res,
      });
    });
  };
};
