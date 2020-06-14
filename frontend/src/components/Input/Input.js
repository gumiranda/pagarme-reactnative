/* eslint-disable no-nested-ternary */
import React, {forwardRef} from 'react';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {TextInputMask} from 'react-native-masked-text';
import {Container} from './styles';
import {appColors} from '../../utils/appColors';

function Input({style, typeMask, typeInput, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color={appColors.black} />}
      {typeInput === 'mask' && typeMask === 'phone' ? (
        <TextInputMask
          {...rest}
          type="cel-phone"
          options={{maskType: 'BRL', withDDD: true, dddMask: '(99)'}}
          ref={ref}
          style={{flex: 1, fontSize: 15, marginLeft: 10, color: '#333'}}
        />
      ) : typeInput === 'mask' && typeMask === 'cpf' ? (
        <TextInputMask
          {...rest}
          type="cpf"
          ref={ref}
          style={{flex: 1, fontSize: 15, marginLeft: 10, color: '#333'}}
        />
      ) : typeInput === 'mask' && typeMask === 'cnpj' ? (
        <TextInputMask
          {...rest}
          type="cnpj"
          ref={ref}
          style={{flex: 1, fontSize: 15, marginLeft: 10, color: '#333'}}
        />
      ) : (
        <TextInput
          style={{flex: 1, fontSize: 15, marginLeft: 10, color: '#333'}}
          placeholderTextColor={appColors.black}
          {...rest}
          ref={ref}
        />
      )}
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
