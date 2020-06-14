import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Text} from './styles';
import {appColors} from '../../utils/appColors';

export default function Button({children, loading, ...rest}) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={appColors.white} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
