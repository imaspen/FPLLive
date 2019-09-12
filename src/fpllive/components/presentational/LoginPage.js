import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {View} from 'react-native';

export default props => (
    <View style={{flex: 1}}>
        <TextInput label="Email" value={props.email} onChangeText={props.setEmail} textContentType="username" keyboardType="email-address" autoCapitalize="none"/>
        <TextInput label="Password" value={props.password} onChangeText={props.setPassword} textContentType="password" secureTextEntry={true} />
        <Button onPress={props.login}>Log In</Button>
    </View>
);
