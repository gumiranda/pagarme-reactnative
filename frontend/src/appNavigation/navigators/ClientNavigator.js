import {createAppContainer} from 'react-navigation';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {createStackNavigator} from 'react-navigation-stack';
import {darken} from 'polished';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from 'react-navigation-drawer';
import appMetrics from '../../utils/appMetrics';
import {signOut} from '../../appStore/appModules/auth/actions';
import Profile from '../../screens/Profile/Profile';
import {appColors} from '../../utils/appColors';

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, []);
  return <></>;
}

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
const RootStack = createDrawerNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: () => ({drawerLabel: 'Meu perfil'}),
    },
    Logout: {
      screen: Logout,
      navigationOptions: () => ({drawerLabel: 'Sair'}),
    },
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerBackground: () => (
        <LinearGradient
          colors={[darken(0.2, appColors.primary), appColors.primary]}
          style={{flex: 1}}
        />
      ),
      headerTintColor: appColors.white,
      title: 'Dev Doido',
      gesturesEnabled: true,
      headerLeft: () => (
        <Icon
          style={{padding: 10, color: appColors.white}}
          name="three-bars"
          size={30}
          color={appColors.black}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
      headerTitleStyle: {
        paddingLeft: appMetrics.DEVICE_WIDTH / 5.5,
        color: appColors.white,
      },
    }),
  },
);

export default createAppContainer(
  createStackNavigator({RootStack: {screen: RootStack}}),
);
