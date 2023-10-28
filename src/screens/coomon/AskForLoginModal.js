/* eslint-disable react-native/no-inline-styles */
import { View, Modal, StyleSheet, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';

const AskForLoginModal = ({ modalVisible, onClickLogin, onClickSignup,onClose }) => {
    return (
        <Modal visible={modalVisible} transparent>
            <View style={styles.modalView} >
                <View style={styles.mainView}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        onClickLogin();
                    }} >
                        <Text style={styles.Text}>{'Login'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { marginBottom: 20 }]} onPress={()=>{
                        onClickSignup();
                    }}>
                        <Text style={styles.Text}>{'Sign Up'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelbtn} onPress={() => {
                        onClose();
                    }}>
                        <Image source={require('../../Images/cancel.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AskForLoginModal;
const styles = StyleSheet.create({
    modalView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainView: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '88%',
    },
    btn: {
        width: '80%',
        height: 62,
        alignSelf: 'center',
        backgroundColor: '#FF9A0C',
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        color: '#fff',
        fontSize: 20,
    },
    icon: {
        width: 30,
        height: 30,
    },
    cancelbtn: {
        position: 'absolute',
        top: 2,
        right: 8,
    },
});
