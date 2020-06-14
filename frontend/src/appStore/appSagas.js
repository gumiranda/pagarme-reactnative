import {all} from 'redux-saga/effects';
import auth from './appModules/auth/sagas';
import user from './appModules/user/sagas';

export default function* appSagas() {
  return yield all([auth, user]);
}
