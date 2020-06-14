import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Title} from './styles';
import Background from '../../components/Background/Background';

export default function Home({navigation}) {
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    if (new Date(profile.payDay).getTime() < new Date().getTime()) {
      if (profile.cpf && profile.phone) {
        navigation.navigate('Payment');
      } else {
        navigation.navigate('CompleteRegister');
      }
    }
  }, [navigation]);

  return (
    <Background>
      <Title>Fala DEVDOIDO</Title>
    </Background>
  );
}
