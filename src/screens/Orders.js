/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from './coomon/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Orders = () => {
    const navigation = useNavigation();
    const ordersList = useSelector(state => state.order);
    console.log(ordersList);
    return (
        <View style={styles.container}>
            <Header leftIcon={require('../Images/back.png')}
                title={'Orders'}
                onClickleftIcon={() => {
                    navigation.goBack();
                }} />
            <FlatList data={ordersList.data}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.orderItem}>
                            <FlatList data={item.items}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.productItem}>
                                            <Image source={{ uri: item.image }}
                                                style={styles.itemImage} />
                                            <View style={styles.text}>
                                                <Text>{item.title.length > 20
                                                    ? item.title.substring(0, 20)
                                                    : item.title}</Text>
                                                <Text>{item.description.length > 20
                                                    ? item.description.substring(0, 20)
                                                    : item.description}</Text>
                                                    <Text style={{color:'green'}}>{'$' + item.price}</Text>
                                            </View>
                                        </View>
                                    );
                                }} />

                        </View>
                    );
                }} />
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    orderItem: {
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth:0.6,
        padding:10,
        borderRadius:10,
        borderColor:'#7d7d7df2',
    },
    productItem: {
        flexDirection: 'row',
        width: '90%',
        height: 70,
        alignSelf: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        top:5,
        right:10,
    },
    text:{
        marginLeft:10,

    },
});
