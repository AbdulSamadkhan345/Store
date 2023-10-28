/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import React, { useState } from 'react';
import Header from './coomon/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from './coomon/CustomButton';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../redux/slices/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddresses = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [type, setType] = useState(
        route.params.type == 'edit'
            ? route.params.data.type == 'Home'
                ? 1
                : 2
            : 1,
    );
    const [state, setState] = useState(
        route.params.type == 'edit' ? route.params.data.state : '',
    );
    const [city, setCity] = useState(
        route.params.type == 'edit' ? route.params.data.city : '',
    );
    const [homeAddress, setHomeAddress] = useState(
        route.params.type == 'edit' ? route.params.data.homeAddress : '',
    );
    const [pincode, setPincode] = useState(
        route.params.type == 'edit' ? route.params.data.pincode : '',
    );
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Header
                leftIcon={require('../Images/back.png')}
                title={route.params.type == 'edit' ? 'Edit Address' : 'Add New Address'}
                onClickleftIcon={() => {
                    navigation.goBack();
                }} />
            <TextInput
                style={[styles.input, { marginTop: 50 }]}
                placeholder="Enter Province"
                value={state}
                onChangeText={txt => setState(txt)} />
            <TextInput
                style={[styles.input, { marginTop: 15 }]}
                placeholder="Enter city"
                value={city}
                onChangeText={txt => setCity(txt)} />
            <TextInput
                style={[styles.input, { marginTop: 15 }]}
                placeholder="Enter House or Office Address"
                value={homeAddress}
                onChangeText={txt => setHomeAddress(txt)} />
            <TextInput
                style={[styles.input, { marginTop: 15 }]}
                placeholder="Enter Pincode"
                keyboardType={'number-pad'}
                value={pincode}
                onChangeText={txt => setPincode(txt)} />
            <View style={styles.typeview}>
                <TouchableOpacity
                    style={[styles.typebtn,
                    { borderWidth: 0.5, borderColor: type == 1 ? 'orange' : 'black' }]}
                    onPress={() => {
                        setType(1);
                    }}>
                    <Image source={type == 2 ? require('../Images/radio_2.png')
                        :
                        require('../Images/radio_1.png')} style={styles.radio} />
                    <Text style={styles.radioText}>{'Home'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typebtn,
                { borderWidth: 0.5, borderColor: type == 2 ? 'orange' : 'black' }]}
                    onPress={() => {
                        setType(2);
                    }}>
                    <Image source={type == 2 ? require('../Images/radio_1.png')
                        :
                        require('../Images/radio_2.png')} style={styles.radio} />
                    <Text style={styles.radioText}>{'Office'}</Text>
                </TouchableOpacity>
            </View>
            <CustomButton
                bg={'#fe9000'}
                title={'Save Addrss'}
                color={'white'}
                onClick={() => {
                    if (route.params.type == 'edit') {
                        dispatch(
                            updateAddress({
                            state: state,
                            city: city,
                            homeAddress: homeAddress,
                            pincode: pincode,
                            type: type == 1 ? 'Home' : 'Office',
                            id: route.params.data.id,
                        }));
                        navigation.goBack();
                    } else {
                        dispatch(
                            addAddress({
                            state: state,
                            city: city,
                            homeAddress: homeAddress,
                            pincode: pincode,
                            type: type == 1 ? 'Home' : 'Office',
                            id: uuid.v4(),
                        }));
                        navigation.goBack();
                    }
                }
                }
            />
        </View>
    );
};

export default AddAddresses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        width: '90%',
        height: 70,
        borderRadius: 20,
        borderWidth: 0.5,
        alignSelf: 'center',
        paddingLeft: 25,
    },
    typeview: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    typebtn: {
        width: '36%',
        height: 60,
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
    },
    radio: {
        width: 24,
        height: 24,
    },
    radioText: {
        marginTop: 0,
        marginLeft: 10,
    },

});
