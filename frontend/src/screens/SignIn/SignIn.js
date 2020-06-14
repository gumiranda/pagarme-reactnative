import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Background from '../../components/Background/Background';
import {signInRequest} from '../../appStore/appModules/auth/actions';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLinkText,
  SignLink,
} from './styles';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const loading = useSelector(state => state.auth.loading);
  function handleSubmit() {
    dispatch(signInRequest({email, senha}));
  }
  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Senha"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            value={senha}
            onChangeText={setSenha}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Login
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Ainda não tem conta? Cadastre-se aqui!</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
