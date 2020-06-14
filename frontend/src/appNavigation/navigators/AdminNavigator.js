import {createAppContainer} from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Profile from '../../screens/Profile/Profile';
import appColors from '../../utils/appColors';

const drawerButton = navigation => (
  <Icon
    style={{padding: 10, color: appColors.white}}
    name="three-bars"
    size={30}
    color={appColors.black}
    onPress={() => {
      navigation.toggleDrawer();
    }}
  />
);

export default createAppContainer(
  createDrawerNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: {drawerLabel: 'Meu perfil'},
      },
    },
    {
      initialRouteName: 'Profile',
      headerMode: 'float',
      navigationOptions: ({navigation}) => ({
        headerBackground: (
          <LinearGradient
            colors={[appColors.primary, appColors.black]}
            style={{flex: 1}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        ),
        headerTintColor: appColors.white,
        title: 'Dev Doido',
        gesturesEnabled: false,
        headerLeft: drawerButton(navigation),
        headerTitleStyle: {color: appColors.white},
      }),
    },
  ),
);
