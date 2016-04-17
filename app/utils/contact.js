/**
 * Created by baebae on 4/6/16.
 */

import Contacts from "react-native-contacts";
import {updateContact} from '../actions/ContactActions';

export default class ContactUtils {
  getContacts(dispatch) {
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
        // x.x
      } else {
        dispatch(updateContact(contacts));
      }
    });
  }
}