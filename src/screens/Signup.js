/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const addUser = () => {
        firestore()
            .collection('Users')
            .add({
                name: name,
                email: email,
                mobile: mobile,
                password: pass,
            })
            .then(() => {
                console.log('User added!');
            });
    };
    return (
        <View style={styles.View} >
            <Text style={styles.text}>{'Sign Up'}</Text>
            <Text style={styles.Text}>{'Create A New Account'}</Text>
            <View style={styles.View2}>
                <TextInput placeholder="Enter Name"
                    style={styles.input}
                    value={name}
                    onChangeText={txt => setName(txt)} />
                <TextInput placeholder="Enter Email"
                    style={styles.input}
                    value={email}
                    onChangeText={txt => setEmail(txt)} />
                <TextInput placeholder="Enter Mobile No:"
                    style={styles.input}
                    keyboardType={'name-phone-pad'}
                    value={mobile}
                    onChangeText={txt => setMobile(txt)} />
                <TextInput placeholder="Enter PassWord"
                    style={styles.input}
                    value={pass}
                    onChangeText={txt => setPass(txt)} />
                <TextInput placeholder="Confirm Password"
                    style={styles.input}
                    value={confirmPass}
                    onChangeText={txt => setConfirmPass(txt)} />
                <TouchableOpacity style={styles.btn}
                 onPress={()=>{
                    addUser();
                    navigation.navigate('Login');
                }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>{'SIGN UP'}</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', right: 18, bottom: 40 }}>
                    Allready have an account ?
                </Text>
                <Text style={styles.loginbtn} onPress={() => {
                    navigation.navigate('Login');
                }}>
                    {'Login'}
                </Text>
            </View>
        </View>
    );
};

export default Signup;
const styles = StyleSheet.create({
    View: {
        backgroundColor: '#FF9A0C',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 65,
        color: 'white',
        left: 117,
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
        left: 17,
        marginTop: 20,
        bottom: 110,

    },
    Text: {
        alignSelf: 'center',
        color: 'white',
        top: 30,
        fontSize: 20,
    },
    btn: {
        height: 60,
        width: '80%',
        backgroundColor: '#E27800',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 90,
        left: 17,
    },
    loginbtn: {
        fontSize: 18,
        color: 'black',
        textDecorationLine: 'underline',
        left: 130,
        bottom: 70,
    },
});
