/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { withNavigation } from 'react-navigation';
import Logo from '../../imgs/navbar.jpg';

import {
  fecthUser,
} from '../../actions';


class Loading extends PureComponent {
  state = {
    deviceToken: null
  };

  async componentDidMount() {
    const { language, token, playerId } = this.props;
    this.onAuthComplete(token);
  }

  onAuthComplete(token) {
    const { navigation } = this.props;
    if (token) {
      console.warn('TOKEN TOKEN--->', token)
      navigation.navigate('main');
    } else {
      setTimeout(() => {
        navigation.navigate('auth');
      }, 250);
    }
  }

  render() {
    return (
      <Transition>
        <View style={styles.container}>
          <StatusBar barStyle="default" />
          <Image
            source={Logo}
            style={{
             
              width: 300,
              height: 54,
              padding:100,
             
              justifyContent: 'center'
            }}
          />
          <ActivityIndicator size="large" color='white' style={{ marginTop: 20 }} />
        </View>
      </Transition>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

function mapStateToProps(state) {
  const {
    auth,
    auth: { token, hasEmail, userId, status },
  } = state;

  return {
    token,
    auth,
    userId,
    hasEmail,
    status,
  };
}

export default withNavigation(
  connect(
    mapStateToProps,
    {
     
      fecthUser,
    }
  )(Loading)
);
