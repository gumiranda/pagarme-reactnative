import React, {useRef, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signUpRequest} from '../../appStore/appModules/auth/actions';
import Background from '../../components/Background/Background';
import {appColors} from '../../utils/appColors';
import {
  Container,
  FormInput,
  Form,
  SubmitButton,
  SignLinkText,
  SignLink,
} from './styles';

const formSchema = Yup.object().shape({
  email: Yup.string().trim().email('Email inválido').required('Obrigatório'),
  nome: Yup.string().trim().required('Obrigatório'),
  senha: Yup.string().trim().required('Obrigatório'),
  senhaConfirmacao: Yup.string()
    .trim()
    .required('Obrigatório')
    .test('password-match', 'As senhas devem ser iguais', function (value) {
      return this.parent.senha === value;
    }),
});

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [type, setType] = useState('client');
  const loading = useSelector(state => state.auth.loading);

  const initialValues = {
    email: '',
    senha: '',
    nome: '',
    senhaConfirmacao: '',
  };
  const onSubmit = values => {
    const {email, nome, senha, senhaConfirmacao} = values;
    dispatch(signUpRequest({email, nome, senha, senhaConfirmacao, type}));
  };
  return (
    <Background>
      <ScrollView>
        <Container>
          <Formik initialValues={initialValues} validationSchema={formSchema}>
            {({values, handleChange, setFieldTouched, touched, errors}) => (
              <Form>
                <FormInput
                  icon="person-outline"
                  autoCorrect
                  autoCapitalize="none"
                  placeholder="Seu nome"
                  name="nome"
                  returnKeyType="next"
                  value={values.nome}
                  onBlur={() => setFieldTouched('nome')}
                  onChangeText={handleChange('nome')}
                  onSubmitEditing={() => emailRef.current.focus()}
                />
                {touched.nome && errors.nome && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: appColors.red,
                    }}>
                    {errors.nome}
                  </Text>
                )}
                <FormInput
                  icon="mail-outline"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Seu email"
                  name="email"
                  ref={emailRef}
                  returnKeyType="next"
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                {touched.email && errors.email && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: appColors.red,
                    }}>
                    {errors.email}
                  </Text>
                )}
                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Sua senha"
                  name="senha"
                  ref={passwordRef}
                  returnKeyType="next"
                  value={values.senha}
                  onBlur={() => setFieldTouched('senha')}
                  onChangeText={handleChange('senha')}
                  onSubmitEditing={() =>
                    passwordConfirmationRef.current.focus()
                  }
                />
                {touched.senha && errors.senha && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: appColors.red,
                    }}>
                    {errors.senha}
                  </Text>
                )}
                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Confirme sua senha"
                  name="senhaConfirmacao"
                  ref={passwordConfirmationRef}
                  returnKeyType="send"
                  value={values.senhaConfirmacao}
                  onBlur={() => setFieldTouched('senhaConfirmacao')}
                  onChangeText={handleChange('senhaConfirmacao')}
                  onSubmitEditing={() => onSubmit(values)}
                />
                {touched.senhaConfirmacao && errors.senhaConfirmacao && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      color: appColors.red,
                    }}>
                    {errors.senhaConfirmacao}
                  </Text>
                )}
                <SubmitButton
                  loading={loading}
                  onPress={() => onSubmit(values)}>
                  Cadastrar
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Já tem conta? Entre aqui</SignLinkText>
          </SignLink>
        </Container>
      </ScrollView>
    </Background>
  );
}
