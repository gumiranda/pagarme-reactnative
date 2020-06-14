import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Text} from 'react-native';
import {
  Container,
  Form,
  FormInput,
  Title,
  SubmitButton,
  Separator,
} from './styles';
import {updateProfileRequest} from '../../appStore/appModules/user/actions';
import Background from '../../components/Background/Background';

const formSchema = Yup.object().shape({
  email: Yup.string().trim().email('Email inválido').required('Obrigatório'),
  nome: Yup.string().trim().required('Obrigatório'),
  oldPassword: Yup.string().trim().required('Obrigatório'),
  senha: Yup.string().trim().required('Obrigatório'),
  senhaConfirmacao: Yup.string()
    .trim()
    .required('Obrigatório')
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      return this.parent.senha === value;
    }),
});

export default function Profile({navigation}) {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const initialValues = {
    email: profile.email,
    senha: '',
    nome: profile.nome,
    oldPassword: '',
    senhaConfirmacao: '',
  };
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const passwordConfirmationRef = useRef();

  const onSubmit = (values, isValid) => {
    if (isValid) {
      const {nome, oldPassword, senha, senhaConfirmacao, email} = values;
      dispatch(
        updateProfileRequest({
          nome,
          oldPassword,
          senha,
          senhaConfirmacao,
          email,
          _id: profile._id,
        }),
      );
    }
  };

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>
        <Formik initialValues={initialValues} validationSchema={formSchema}>
          {({
            values,
            isValid,
            handleChange,
            setFieldTouched,
            touched,
            errors,
          }) => (
            <Form>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                placeholder="Seu nome"
                name="nome"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                value={values.nome}
                onBlur={() => setFieldTouched('nome')}
                onChangeText={handleChange('nome')}
              />
              {touched.nome && errors.nome && (
                <Text style={{fontSize: 12, marginBottom: 10, color: 'red'}}>
                  {errors.nome}
                </Text>
              )}
              <FormInput
                icon="mail-outline"
                autoCorrect={false}
                keyboardType="email-address"
                editable={false}
                placeholder="Seu email"
                name="email"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordRef.current.focus()}
                value={values.email}
                onBlur={() => setFieldTouched('email')}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={{fontSize: 12, marginBottom: 10, color: 'red'}}>
                  {errors.email}
                </Text>
              )}
              <Separator />
              <FormInput
                icon="lock-outline"
                autoCorrect={false}
                secureTextEntry
                placeholder="Sua senha atual"
                name="oldPassword"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                value={values.oldPassword}
                onBlur={() => setFieldTouched('oldPassword')}
                onChangeText={handleChange('oldPassword')}
              />
              <FormInput
                icon="lock-outline"
                autoCorrect={false}
                secureTextEntry
                placeholder="Sua nova senha"
                name="senha"
                returnKeyType="next"
                onSubmitEditing={() => passwordConfirmationRef.current.focus()}
                value={values.senha}
                onBlur={() => setFieldTouched('senha')}
                onChangeText={handleChange('senha')}
              />
              {touched.senha && errors.senha && (
                <Text style={{fontSize: 12, marginBottom: 10, color: 'red'}}>
                  {errors.senha}
                </Text>
              )}
              <FormInput
                icon="lock-outline"
                autoCorrect={false}
                secureTextEntry
                placeholder="Confirme sua senha nova"
                name="senhaConfirmacao"
                returnKeyType="send"
                onSubmitEditing={() => onSubmit(values, isValid)}
                value={values.senhaConfirmacao}
                onBlur={() => setFieldTouched('senhaConfirmacao')}
                onChangeText={handleChange('senhaConfirmacao')}
              />
              {touched.senhaConfirmacao && errors.senhaConfirmacao && (
                <Text style={{fontSize: 12, marginBottom: 10, color: 'red'}}>
                  {errors.senhaConfirmacao}
                </Text>
              )}
              <SubmitButton
                loading={loading}
                onPress={() => onSubmit(values, isValid)}>
                Atualizar perfil
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
}
