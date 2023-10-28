/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './coomon/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, emptyCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice';
import CustomButton from './coomon/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { orderItem } from '../redux/slices/OrderSlice';

const Checkout = () => {
    const navigation = useNavigation();
    const items = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();
    const [selectedMethod, setSelectedMethod] = useState(0);
    const [selectAddress, setSelectedAddress] = useState('Please Select Address');
    const isFocused = useIsFocused();
    useEffect(() => {
        setCartItems(items.data);
    }, [items]);
    const getTotal = () => {
        let total = 0;
        cartItems.map(item => {
            total = total + item.qty * item.price;
        });
        return total.toFixed(0);
    };
    useEffect(() => {
        getSelectedAddress();
    }, [
        isFocused,
    ]);
    const getSelectedAddress = async () => {
        setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
    };
    const orderPlace = paymentId => {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        let ampm = '';
        if (hours > 12){
            ampm = 'pm';
        } else {
            ampm = 'am';
        }
        const data = {
            items: cartItems,
            amount: '$' + getTotal(),
            address: selectAddress,
            paymentid: paymentId,
            paymentStatus: selectedMethod == 3 ? 'Panding' : ' Success',
            createdAt: day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + '' + ampm,
        };
        dispatch(orderItem(data));
        dispatch(emptyCart([]));
        navigation.navigate('OrderSuccess');
    };
    const payNow = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_Ylu4Q8xrZqDVZQ', // Your api key
            amount: getTotal() * 100,
            name: 'foo',
            prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'Razorpay Software',
            },
            theme: { color: '#F37254' },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
                orderPlace(data.razorpay_payment_id);
            }).catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
    };
    return (
        <View style={styles.container}>
            <Header leftIcon={require('../Images/back.png')}
                title={'CheckOut'} onClickleftIcon={() => {
                    navigation.goBack();
                }} />
            <Text style={styles.title}>Added Items</Text>
            <View>
                <FlatList
                    data={cartItems}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.productItem}
                                onPress={() => {
                                    navigation.navigate('ProductDetail', { data: item });
                                }}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View>
                                    <Text style={styles.name}>
                                        {item.title.length > 25
                                            ? item.title.substring(0, 25) + '...'
                                            : item.title}
                                    </Text>
                                    <Text style={styles.desc}>
                                        {item.description.length > 30
                                            ? item.description.substring(0, 30) + '...'
                                            : item.description}
                                    </Text>
                                    <View style={styles.qtyview}>
                                        <Text style={styles.price}>{'$' + item.price}</Text>
                                        <TouchableOpacity style={styles.btn}
                                            onPress={() => {
                                                if (item.qty > 1) {
                                                    dispatch(reduceItemFromCart(item));
                                                } else {
                                                    dispatch(removeItemFromCart(index));
                                                }
                                            }}>
                                            <Text style={{ fontSize: 18, fontWeight: '600' }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qty}>{item.qty}</Text>
                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            dispatch(addItemToCart(item));
                                        }}>
                                            <Text style={{ fontSize: 18, fontWeight: '600' }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }} />
            </View>
            <View style={styles.totalView} >
                <Text style={styles.title}>Total</Text>
                <Text style={[styles.title, { marginRight: 20 }]}>{'$' + getTotal()}</Text>
            </View>
            <Text style={styles.title}>
                Select Payment Mode
            </Text>
            <TouchableOpacity style={styles.paymentMethods}
                onPress={() => {
                    setSelectedMethod(0);
                }}>
                <Image source={
                    selectedMethod == 0
                        ? require('../Images/radio_1.png')
                        : require('../Images/radio_2.png')
                }
                    style={[styles.img,
                    { tintColor: selectedMethod == 0 ? 'orange' : 'black' }]} />
                <Text style={styles.paymentMethodstxt}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethods}
                onPress={() => {
                    setSelectedMethod(1);
                }}>
                <Image source={
                    selectedMethod == 1
                        ? require('../Images/radio_1.png')
                        : require('../Images/radio_2.png')
                }
                    style={[styles.img,
                    { tintColor: selectedMethod == 1 ? 'orange' : 'black' }]} />
                <Text style={styles.paymentMethodstxt}>JazzCash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethods}
                onPress={() => {
                    setSelectedMethod(2);
                }}>
                <Image source={
                    selectedMethod == 2
                        ? require('../Images/radio_1.png')
                        : require('../Images/radio_2.png')
                }
                    style={[styles.img, { tintColor: selectedMethod == 2 ? 'orange' : 'black' }]} />
                <Text style={styles.paymentMethodstxt}>EasyPaisa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethods}
                onPress={() => {
                    setSelectedMethod(3);
                }}>
                <Image source={
                    selectedMethod == 3
                        ? require('../Images/radio_1.png')
                        : require('../Images/radio_2.png')
                }
                    style={[styles.img, { tintColor: selectedMethod == 3 ? 'orange' : 'black' }]} />
                <Text style={styles.paymentMethodstxt}>Cash on Delivery</Text>
            </TouchableOpacity>
            <View style={styles.addressesView}>
                <Text style={styles.title}>Address</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Addresses');
                    }}>
                    <Text style={[styles.title, { textDecorationLine: 'underline', color: '#636363' }]}>
                        Edit Address
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, { marginTop: 10, fontSize: 16, color: '#636363' }]}>
                {selectAddress}
            </Text>
            <CustomButton bg={'green'}
                title={'Pay and Order'}
                color={'#fff'}
                onClick={() => {
                    payNow();
                }} />
        </View>
    );
};

export default Checkout;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 30,
        color: '#000',
    },
    productItem: {
        width: Dimensions.get('window').width,
        height: 120,
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemImage: {
        width: 115,
        height: 115,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
    },
    desc: {
        marginLeft: 20,
    },
    price: {
        color: 'green',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 5,
    },
    qtyview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    totalView: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 75,
        borderBottomWidth: 1,
        borderBottomColor: '#B7B7B7',
    },
    paymentMethods: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 20,
        paddingLeft: 20,
    },
    img: {
        width: 24,
        height: 24,
    },
    paymentMethodstxt: {
        marginLeft: 13,
        fontSize: 16,
        color: '#000',
        bottom: 2,
    },
    addressesView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20,
    },
    btn: {
        padding: 5,
        borderWidth: 0.5,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
});
