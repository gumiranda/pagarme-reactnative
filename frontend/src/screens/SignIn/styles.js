import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {appColors} from '../../utils/appColors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;
export const SignLinkText = styled.Text`
  color: ${appColors.white};
  font-weight: bold;
  font-size: 16px;
`;
