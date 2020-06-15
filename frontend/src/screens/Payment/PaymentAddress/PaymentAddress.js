import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Text, Alert} from 'react-native';
import cep from 'cep-promise';
import {Container, Form, FormInput, Title, SubmitButton} from './styles';
import Background from '../../../components/Background/Background';
import {appColors} from '../../../utils/appColors';

const formSchema = Yup.object().shape({
  zipcode: Yup.string()
    .trim()
    .required('Obrigatório')
    .length(9, 'o cep deve ter pelo menos 8 dígitos'),
  street: Yup.string().trim().required('Obrigatório'),
  street_number: Yup.string().trim().required('Obrigatório'),
  city: Yup.string().trim().required('Obrigatório'),
  state: Yup.string().trim().required('Obrigatório'),
  neighborhood: Yup.string().trim().required('Obrigatório'),
  complemento: Yup.string().trim().required('Obrigatório'),
});

export default function PaymentAddress({navigation}) {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const initialValues = {
    zipcode: '',
    state: '',
    street: '',
    city: '',
    neighborhood: '',
    complemento: '',
    street_number: '',
  };

  const streetRef = useRef();
  const complementoRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const neighborhoodRef = useRef();
  const streetnumberRef = useRef();

  const onSubmit = async (values, isValid) => {
    if (isValid) {
      const {
        zipcode,
        state,
        street,
        city,
        neighborhood,
        street_number,
        complemento,
      } = values;

      navigation.push('PaymentCart', {
        zipcode,
        state,
        street,
        city,
        neighborhood,
        street_number,
        complemento,
      });
    }
  };

  const onChangeCep = async (setValues, values, txt) => {
    if (txt.length == 9) {
      setValues({...values, zipcode: txt});
      try {
        const {state, city, street, neighborhood} = await cep(txt);
        setValues({...values, state, city, street, neighborhood, zipcode: txt});
      } catch (e) {
        Alert.alert('CEP não foi encontrado');
      }
    } else {
      setValues({...values, zipcode: txt});
    }
  };

  return (
    <Background>
      <Container>
        <Title>Endereço de cobrança</Title>
        <Formik initialValues={initialValues} validationSchema={formSchema}>
          {({
            values,
            handleChange,
            setFieldTouched,
            touched,
            isValid,
            errors,
            setValues,
          }) => (
            <Form>
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                CEP
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Seu CEP"
                name="zipcode"
                returnKeyType="next"
                keyboardType="number"
                typeInput="mask"
                typeMask="cep"
                onSubmitEditing={() => {
                  streetnumberRef.current.focus();
                }}
                value={values.zipcode}
                onBlur={() => setFieldTouched('zipcode')}
                onChangeText={txt => {
                  onChangeCep(setValues, values, txt);
                }}
              />
              {touched.zipcode && errors.zipcode && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.zipcode}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                Cidade
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Sua cidade"
                name="city"
                ref={cityRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  stateRef.current.focus();
                }}
                value={values.city}
                onBlur={() => setFieldTouched('city')}
                onChangeText={handleChange('city')}
              />
              {touched.city && errors.city && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.city}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                Estado
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Seu estado"
                name="state"
                ref={stateRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  neighborhoodRef.current.focus();
                }}
                value={values.state}
                onBlur={() => setFieldTouched('state')}
                onChangeText={handleChange('state')}
              />
              {touched.state && errors.state && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.state}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                Bairro
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Seu bairro"
                name="neighborhood"
                ref={neighborhoodRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  neighborhoodRef.current.focus();
                }}
                value={values.neighborhood}
                onBlur={() => setFieldTouched('neighborhood')}
                onChangeText={handleChange('neighborhood')}
              />
              {touched.neighborhood && errors.neighborhood && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.neighborhood}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                Endereço
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Sua rua"
                name="street"
                ref={streetRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  streetnumberRef.current.focus();
                }}
                value={values.street}
                onBlur={() => setFieldTouched('street')}
                onChangeText={handleChange('street')}
              />
              {touched.street && errors.street && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.street}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                Número
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Número"
                name="street_number"
                ref={streetnumberRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  complementoRef.current.focus();
                }}
                value={values.street_number}
                onBlur={() => setFieldTouched('street_number')}
                onChangeText={handleChange('street_number')}
              />
              {touched.street_number && errors.street_number && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.street_number}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 10,
                  color: appColors.white,
                }}>
                Complemento
              </Text>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Complemento"
                name="complemento"
                ref={complementoRef}
                returnKeyType="send"
                onSubmitEditing={() => {
                  onSubmit(values, isValid);
                }}
                value={values.complemento}
                onBlur={() => setFieldTouched('complemento')}
                onChangeText={handleChange('complemento')}
              />
              {touched.complemento && errors.complemento && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.complemento}
                </Text>
              )}
              <SubmitButton
                loading={loading}
                onPress={() => onSubmit(values, isValid)}>
                Avançar
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
}
