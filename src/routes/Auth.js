import { createStackNavigator } from 'react-navigation-stack'

import { BackButton } from '../componets/header-buttons/index';
import Onboarding from '../componets/onboarding';
//import SignUpForm from '../components/onboarding/signUpForm';
import { headerStyle, headerTitleStyle, headerTitleStyle2, colors } from '../libs/styles'

 import Login from '../componets/onboarding/login';
// import ForgetPassword from '../components/onboarding/forget-password';
// import InsertCode from '../components/onboarding/insertCodeForm';
// import ResetPassword from '../components/onboarding/resetPassword';

const Auth = createStackNavigator(
  {
    onboarding: {
      screen: Onboarding,
      navigationOptions: {
        headerMode: 'none',
        header: null,
        ...headerTitleStyle,

      }
    },
       login: {
         screen: Login,
         navigationOptions: ({ navigation }) => ({
            title:null,
            ...headerTitleStyle,

          })
       },
   
    // forgetPassword: {
    //   screen: ForgetPassword,
    //   navigationOptions: ({ navigation }) => ({
    //     headerLeft: BackButton(navigation)
    //   })
    // },
    // insertCode: {
    //   screen: InsertCode,
    //   navigationOptions: ({ navigation }) => ({
    //     headerLeft: BackButton(navigation)
    //   })
    // },
    // resetPassword: {
    //   screen: ResetPassword,
    //   navigationOptions: ({ navigation }) => ({
    //     headerLeft: BackButton(navigation)
    //   })
    // }
  },
  {
    initialRouteName: 'onboarding',
    navigationOptions: {
      ...headerTitleStyle,

    }
  }
);

export default Auth;
