import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '../../../services/api';
import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {
      nome,
      _id,
      email,
      oldPassword,
      senha,
      senhaConfirmacao,
    } = payload.data;
    const profile = {
      nome,
      _id,
      email,
      oldPassword,
      senha,
      senhaConfirmacao,
    };

    const response = yield call(api.put, `user/${profile._id}`, profile);
    if (response.data.message) {
      Alert.alert('Erro', response.data.message);
      yield put(updateProfileFailure());
    } else if (response.data) {
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      yield put(updateProfileSuccess(response.data));
    } else {
      Alert.alert('Erro', 'Confira seus dados');
      yield put(updateProfileFailure());
    }
  } catch (err) {
    console.tron.log(err);
    Alert.alert('Erro', 'Confira seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
