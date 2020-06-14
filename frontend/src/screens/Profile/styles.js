import styled from 'styled-components/native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {appColors} from '../../utils/appColors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: ${appColors.white};
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;
export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-vertical: 5px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const Separator = styled.View`
  height: 1px;
  background: ${appColors.black};
  margin: 20px 0 30px;
`;
