import React from 'react';
import {useSelector} from 'react-redux';
import AdminNavigator from './navigators/AdminNavigator';
import ClientNavigator from './navigators/ClientNavigator';

const NavigatorSelector = () => {
  const profile = useSelector(state => state.user.profile);
  if (profile.type === 'admin') {
    return <AdminNavigator />;
  }
  return <ClientNavigator></ClientNavigator>;
};

export default NavigatorSelector;
