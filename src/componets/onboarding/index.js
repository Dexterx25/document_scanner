/* eslint-disable no-shadow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import { withTranslation } from 'react-i18next'
import { colors, buttonPrimary, buttonText } from '../../libs/styles'
import { handleHitSlop } from '../../libs/helpers'
import ImageSlider from '../image-slider'
import { appleLogin, registrationUserWithApple, facebookLogin, changeLanguage, addDevice, fecthUser, addLocalDevice} from '../../actions'
import Icon from '../../libs/CustomIcon'

 class Onboarding extends Component {

  state ={
  }

  componentDidMount () {
    
  }
  
  

  componentDidUpdate (prevProps, prevState) {
    const { status, navigation } = this.props
    if (prevProps !== this.props) {
      if (status === 'success') {
        navigation.navigate('loading')
      }
    }
  }

  render () {
    const { t, navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
        <ImageSlider
            ref={this.myRef}
          />
          <View style={styles.btnContent}>
            <View style={styles.providersContent}>
              {
             <TouchableOpacity
                  style={styles.appleButton}
                  underlayColor={'#ffffff'}
                  onPress={() => navigation.navigate('login')}
                  hitSlop={handleHitSlop(14)}
                >
                  <Text style={{ ...buttonText, color: colors.greyLight,  fontWeight: '800' }}>
                    { "Iniciar Sección" }
                  </Text>
              </TouchableOpacity>
              }
             
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    height: '100%'
  },
  btnContent: {
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign:'center'
  },
  buttonContact: {
    ...buttonPrimary,
    width: 279,
    marginBottom: 0,
    marginTop: 0
  },
  buttonFb: {
    ...buttonPrimary,
    backgroundColor: colors.blue,
    flexBasis: '100%',
    marginTop: 0,
    marginBottom: 0
  },
  iconEmail: {
    marginRight: 40
  },
  icon: {
    marginRight: 40,
    fontSize: 30
  },
  textContent: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    marginBottom: 50
  },
  textRef: {
    fontSize: 13,
    color: colors.greyLight,
    fontWeight: '500'
  },
  providersContent: {
    flexDirection: 'row',
    width: 330,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: 10,
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1
  },
  appleButton: {
    flexDirection: 'row',
    borderColor: 'black',
    backgroundColor:'#ff4300',
    borderWidth: 1,
    height:50,
    fontSize:60,
    borderStyle: 'solid',
    borderRadius: 10,
    flexBasis: '78%',
    fontWeight: '500',
    fontFamily: 'SF Pro Text',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
})

export default Onboarding
