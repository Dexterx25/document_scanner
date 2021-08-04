/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { isEmpty } from 'lodash'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { withFormik } from 'formik'
import { Transition } from 'react-navigation-fluid-transitions'
import i18n from 'i18next'

import { withTranslation } from 'react-i18next'
import { colors, buttonPrimary, buttonText, inputText, inputSection } from '../../libs/styles'
import { handleHitSlop } from '../../libs/helpers'
import { authenticationsUser, successMessage, errorMessage, addDevice, fecthUser, addLocalDevice } from '../../actions'
import { isusername } from '../../libs/validations'
import ImageIcon from '../icon'

class Login extends Component {

  state = {
    showPassword: false,
  }
  componentDidMount(){
  }


  handleShowPassoword = () => {
    this.setState({showPassword: !this.state.showPassword})
  }

  renderShowPassword = () => {
    const { showPassword } = this.state
    return (
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 12, right: 20 }}
        onPress={this.handleShowPassoword}
      >
        <ImageIcon
          name={showPassword ? 'showIcon' : 'notShowIcon'}
          height={27}
          width={27}
          hitSlop={handleHitSlop(12)}
        />
      </TouchableOpacity>
    )
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      navigation,
      t
    } = this.props

    return (
      <Transition appear='right' disappear='left'>
        <View style={styles.container}>
          <View style={styles.formContent}>
            <View style={[inputSection, { position: 'relative' }]}>
              <TextInput
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                style={styles.inputText}
                autoCapitalize='none'
                placeholder={ "Coloca tu nombre de usuario o correo" }
                placeholderTextColor={colors.greyText}
              />
              {errors.username ? (
                touched.username ? (
                  <Text style={styles.errorText}>{errors.username}</Text>
                ) : null
              ) : null}
            </View>
            <View style={[inputSection, { position: 'relative' }]}>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.inputText}
                secureTextEntry={!this.state.showPassword}
                placeholder={ "Coloca tu contraseña" }
                autoCapitalize='none'
                placeholderTextColor={colors.greyText}
              />
              {this.renderShowPassword()}
              {errors.password ? (
                touched.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null
              ) : null}
            </View>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('forgetPassword')}
              hitSlop={handleHitSlop(14)}
            >
              <Text style={styles.textSmall}>{ 'forgotPassword') }</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.btnContent}>
            <TouchableOpacity
              style={styles.buttonForm} onPress={handleSubmit}
              hitSlop={handleHitSlop(14)}
            >
              <Text style={buttonText}>{"Iniciar Sección"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Transition>
    )
  }
}

const enhanced = withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
  }),

  validate: values => {
    const errors = {}

    if (isEmpty(values.username)) {
      errors.username = ('Coloca tu correo o usuario')
    }
    if (isEmpty(values.password)) {
      errors.password = ('Debes colocar tu contraseña')
    }

    return errors
  },

  handleSubmit: async (values, { props }) => {
    try {
      const responLogin = await  props.authenticationsUser(values)
        .then((res)=>{
            
            console.warn('DATA CURRENT USER---->', res)
            props.navigation.navigate('main')

        })

        
      
       } catch (error) {
         console.warn('this is the error with Login-->', error)
            errorMessage('datos incorrectos, verifique y vuelva a intentar..')
       }
  
    
  },

  displayName: 'Login'
})(Login)

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 13,
    color: '#C4C4CB',
    textAlign: 'right',
    marginTop: 18,
    marginRight: 18
  },
  formTitle: {
    color: colors.purpleDark,
    fontSize: 30,
    fontWeight: '500'
  },
  errorText: {
    color: colors.red,
    fontSize: 13,
    position: 'absolute',
    bottom: -20
  },
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    position: 'relative',
    flex: 1
  },
  icon: {
    color: colors.red,
    paddingBottom: 25,
    marginLeft: 20,
    marginTop: 70
  },
  formContent: {
    paddingBottom:80,
    margin: 30
  },
  buttonForm: {
    ...buttonPrimary,
    width: 279,
    justifyContent: 'center',
    marginTop: 10
  },
  btnContent: {
    alignItems: 'center',
     paddingTop:-40,
    justifyContent: 'center'
  },
  inputText :{
    paddingBottom: 14,
    fontWeight: '300',
    marginTop: 55,
    fontSize: 16,
    color: colors.greyLight
  }
})

function mapStateToProps (state) {
  const {
    auth: { token, hasusername, localDevice},
    
  } = state

  return {
    token,
    localDevice,
    hasusername
  }
}

export default withNavigation(
  connect(
    mapStateToProps,
    { authenticationsUser, addDevice, fecthUser, addLocalDevice}
  )(enhanced)
)
