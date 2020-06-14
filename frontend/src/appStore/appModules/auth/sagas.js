import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, senha} = payload;
    const senhaConfirmacao = senha;
    const response = yield call(api.post, 'user/authenticate', {
      email,
      senha,
      senhaConfirmacao,
    });
    const {token, usuario} = response.data;
    AsyncStorage.setItem('user', JSON.stringify({usuario, token}));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, usuario));
  } catch (e) {
    Alert.alert('Erro', 'Login falhou ai bixo, verifique usuário e senha');
    yield put(signFailure());
  }
}
export function* signUp({payload}) {
  try {
    const {email, senha, senhaConfirmacao, type, nome} = payload;
    if (type === 'admin') {
      Alert.alert('Erro', 'Você não pode ser o admin');
      yield put(signFailure());
    }

    const response = yield call(api.post, 'user/register', {
      email,
      senha,
      senhaConfirmacao,
      type,
      nome,
    });
    if (response.status === 201) {
      Alert.alert('Sucesso', 'Cadastro realizado');
      const responseSign = yield call(api.post, 'user/authenticate', {
        email,
        senha,
        senhaConfirmacao,
      });
      const {token, usuario} = responseSign.data;
      AsyncStorage.setItem('user', JSON.stringify({usuario, token}));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(signInSuccess(token, usuario));
    } else {
      Alert.alert('Erro', 'Existem dados inválidos na sua requisição');
      yield put(signFailure());
    }
  } catch (e) {
    Alert.alert('Erro', 'Cadastro falhou ai bixo, verifique usuário e senha');
    yield put(signFailure());
  }
}
export function signOut() {}
export function setToken({payload}) {
  if (!payload) return;
  if (payload.token === undefined) {
    if (payload.auth.token) {
      api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
    }
  } else {
    const {token} = payload;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
