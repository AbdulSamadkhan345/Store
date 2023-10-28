/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Header from './coomon/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAddress } from '../redux/slices/AddressSlice';

const Addresses = () => {
    const navigation = useNavigation();
    const addressList = useSelector(state => state.address);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(addressList);
    }, [isFocused]);
    const defaultAddress = async (item) => {
        await AsyncStorage.setItem('MY_ADDRESS',
            '' + item.city + ','
            + item.state + ','
            + item.pincode + ','
            + item.homeAddress + ',type:'
            + item.type);
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <Header
                leftIcon={require('../Images/back.png')}
                title={'My Addresses'}
                onClickleftIcon={() => {
                    navigation.goBack();
                }} />
            <FlatList
                data={addressList.data}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                width: '90%',
                                backgroundColor: '#fff',
                                borderWidth: 1,
                                alignSelf: 'center',
                                marginTop: 20,
                                paddingLeft: 20,
                                paddingBottom: 10,
                                paddingTop: 10,
                                borderRadius: 10,
                            }} onPress={() => {
                                defaultAddress(item);
                            }}>
                            <Text style={styles.state}>{`State: ${item.state}`}</Text>
                            <Text style={styles.state}>{`City: ${item.city}`}</Text>
                            <Text style={styles.state}>{`Address: ${item.homeAddress}`}</Text>
                            <Text style={styles.state}>{`Postal Code: ${item.pincode}`}</Text>
                            <Text style={[styles.state, {
                                position: 'absolute',
                                right: 10,
                                top: 10,
                                backgroundColor: '#d9dddc',
                                borderRadius: 10,
                                color: 'black',
                                padding: 10,
                                fontSize: 15,
                            }]}>
                                {item.type}
                            </Text>
                            <View style={styles.bottomview}>
                                <TouchableOpacity style={styles.bottomicon}
                                    onPress={() => {
                                        navigation.navigate('AddAddresses',
                                         { type: 'edit', data: item,
                                        });
                                    }}>
                                    <Image source={require('../Images/edit.png')}
                                        style={[styles.bottomicon, { right: 10 }]} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bottomicon}
                                    onPress={() => {
                                        dispatch(deleteAddress(item.id));
                                    }}>
                                    <Image source={require('../Images/delete.png')} style={styles.bottomicon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }} />
            <TouchableOpacity style={styles.addButton} onPress={() => {
                navigation.navigate('AddAddresses', { type: 'new' });
            }} >
                <Text style={styles.txt}>+</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Addresses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addButton: {
        height: 65,
        width: 65,
        backgroundColor: '#ec8a00',
        borderRadius: 33,
        position: 'absolute',
        bottom: 50,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 30,
        color: '#fff',
    },
    state: {
        color: 'black',
        fontSize: 16,
    },
    bottomview: {
        position: 'absolute',
        right: 15,
        bottom: 10,
        flexDirection: 'row',
    },
    bottomicon: {
        width: 24,
        height: 24,
    },
});
