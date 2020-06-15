import styled from 'styled-components/native';
import {appColors} from '../../../utils/appColors';
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
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  border-radius: 20px;
`;
