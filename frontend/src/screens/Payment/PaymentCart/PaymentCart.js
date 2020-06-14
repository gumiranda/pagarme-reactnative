/* eslint-disable radix */
import React, {useState} from 'react';
import CryptoJS from 'react-native-crypto-js';
import {CreditCardInput} from 'react-native-credit-card-input';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Container, SubmitButton, Title} from './styles';
import Background from '../../../components/Background/Background';
import api from '../../../services/api';
import {completeProfileRequest} from '../../../appStore/appModules/user/actions';

export default function PaymentCart({navigation}) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [cart, setCart] = useState({});
  const profile = useSelector(state => state.user.profile);

  async function handleSubmit() {
    if (isValid) {
      const expiration = parseInt(cart.expiry.replace('/', ''));
      const numbercart = cart.number.toString().replace(/\s+/g, '');
      const objToEncrypt = JSON.stringify({
        card_number: numbercart,
        card_expiration_date: expiration,
        card_holder_name: cart.name,
        card_cvv: cart.cvc,
      });
      const card_hash = CryptoJS.AES.encrypt(
        objToEncrypt,
        'hdfudhuidfhudhudah9d8s8f9d8a98as9d8s9d89as',
      ).toString();

      const state = navigation.getParam('state');
      const complemento = navigation.getParam('complemento');
      const street = navigation.getParam('street');
      const street_number = navigation.getParam('street_number');
      const city = navigation.getParam('city');
      const zipcode = navigation.getParam('zipcode').replace('-', '');
      const neighborhood = navigation.getParam('neighborhood');
      const {cpf, phone, email} = profile;

      const obj = {
        city,
        name: cart.name,
        state,
        complemento,
        zipcode,
        card_hash,
        neighborhood,
        street,
        email,
        cpf,
        phone,
        street_number,
      };
      const response = await api.post('transaction', obj);
      if (response.data) {
        Alert.alert(
          'Pagamento feito com sucesso',
          'Seu acesso à plataforma DevDoido está liberado!',
        );
        dispatch(
          completeProfileRequest({
            cpf,
            phone,
          }),
        );
        navigation.navigate('Home');
      }
    } else {
      Alert.alert('Cartão inválido', 'Preencha dados válidos para prosseguir');
    }
  }
  async function getForm(form) {
    if (form.valid) {
      setIsValid(true);
      setCart(form.values);
    }
  }
  return (
    <Background>
      <Container>
        <Title>Detalhes do pagamento</Title>
        <CreditCardInput
          labels={{
            number: 'Número do cartão',
            name: 'Nome do titular',
            expiry: 'Validade',
            cvc: 'CVV',
          }}
          placeholders={{
            number: 'Número do cartão',
            name: 'Nome do titular',
            expiry: 'Validade',
            cvc: 'CVV',
          }}
          inputStyle={{color: 'white'}}
          labelStyle={{color: 'white'}}
          requiresName
          onChange={form => {
            getForm(form);
          }}
        />
        <SubmitButton onPress={() => handleSubmit()}>
          Confirmar pagamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
