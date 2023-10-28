/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const loginUser = () => {
        firestore()
            .collection('Users')
            //Filtter results
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                /* ... */
                console.log(querySnapshot.docs[0]._data);
            });
    };
    return (
        <View style={styles.View} >
            <Text style={styles.text}>{'Login'}</Text>
            <View style={styles.View2}>
                <Text style={styles.welcomeback}>Welcome Back</Text>
                <Text style={styles.Text}>{'Login into your Account'}</Text>
                <TextInput placeholder="Enter Email"
                    style={styles.input}
                    value={email}
                    onChangeText={txt => setEmail(txt)} />
                <TextInput placeholder="Enter PassWord"
                    style={styles.input}
                    value={pass}
                    onChangeText={txt => setPass(txt)} />
                <TouchableOpacity
                 style={styles.btn}
                 onPress={()=>{
                        loginUser();
                        navigation.navigate('ProductDetail');
                    }}>
                    <Text style={{ fontSize: 20, color: '#fff' }} >{'Login'}</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', right: 18, bottom: 40 }}>
                    Don't have an account ?
                </Text>
                <Text style={styles.loginbtn} onPress={() => {
                    navigation.navigate('Signup');
                }}>
                    {'Sign Up'}
                </Text>
            </View>
        </View>
    );
};

export default Login;
const styles = StyleSheet.create({
    View: {
        backgroundColor: '#FF9A0C',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 65,
        color: 'white',
        left: 140,
        top: 40,
        fontStyle: ('normal', 'italic'),
    },
    View2: {
        backgroundColor: 'white',
        height: 800,
        width: '100%',
        alignSelf: 'center',
        top: 70,
        borderTopLeftRadius: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '85%',
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        left: 0,
        marginTop: 20,
        bottom: 130,

    },
    Text: {
        alignSelf: 'center',
        color: 'black',
        bottom: 175,
        fontSize: 20,
    },
    btn: {
        height: 60,
        width: '80%',
        backgroundColor: '#E27800',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 95,
        left: 0,
    },
    loginbtn: {
        fontSize: 18,
        color: 'black',
        textDecorationLine: 'underline',
        left: 125,
        bottom: 70,
    },
    welcomeback: {
        fontSize: 40,
        bottom: 175,
        color: 'black',
        fontWeight: '600',
    },
});
