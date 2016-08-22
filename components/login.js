'use strict';

import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, NavigatorIOS, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

var Form = t.form.Form;

var LoginForm = t.struct({

  email: t.String,  // an optional string
  password: t.String              // a required number

});

var options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    },
    email: {
      keyboardType: 'email-address',
      autoCorrect: false,
    },
  },
}

class Login extends Component {

  constructor(props){
   super(props);
   this._onPress = this._onPress.bind(this);
 }

  _onPress() {
    var value = this.refs.form.getValue();
    var user_email = value.email;
    var user_password = value.password;
    console.log(value);

   fetch('https://threeforpong.herokuapp.com/api/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${user_email}`,
        password: `${user_password}`
      })
    })
    .then((response) => response.json())
    .then((responseData) => {

       console.log(responseData.token);
       console.log("Devina");
       console.log(responseData.user_id);
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={LoginForm}
          options={options}
          style={styles.title}

        />
        <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#1B676B',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: -200,
    marginTop: 200,
    color: 'white',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88C425',
    paddingTop: 25,
    paddingBottom: 25,
    width: 400,
    marginLeft: -40,
    marginTop: 180,
    marginBottom: -205,
  }
  });

export default Login;