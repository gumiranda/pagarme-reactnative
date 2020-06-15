import styled from 'styled-components/native';
import {appColors} from '../../../utils/appColors';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

export const Title = styled.Text`
  font-size: 20px;
  color: ${appColors.white};
  font-weight: bold;
  align-self: center;
  margin-vertical: 15px;
`;
export const Container = styled.SafeAreaView`
  font-size: 20px;
  color: ${appColors.white};
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;
export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 5},
})`
  align-self: stretch;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
