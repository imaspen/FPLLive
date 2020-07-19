import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const MyTextInput = props => (
    <TextInput
        {...props} style={styles.input} mode="outlined" allowFontScaling={false}
    />
);

export default props => {
    DeviceInfo.getFontScale().then(fontScale => {
    });

    return (
        <View style={styles.view}>
            <MyTextInput label="Email" value={props.email} onChangeText={props.setEmail} textContentType="username"
                         keyboardType="email-address" autoCapitalize="none" placeholder="Email"/>
            <MyTextInput label="Password" value={props.password} onChangeText={props.setPassword}
                         textContentType="password" secureTextEntry={true}/>
            <Button onPress={props.login} style={styles.input}>Log In</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 10,
    },
    input: {
        margin: 10,
    },
});
