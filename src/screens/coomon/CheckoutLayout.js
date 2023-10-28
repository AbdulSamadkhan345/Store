/* eslint-disable react-native/no-inline-styles */
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CheckoutLayout = ({ total, items }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container} >
      <View style={styles.tab}>
        <Text>{`(Items: ${items} )`}</Text>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>{'Total: $' + total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity style={styles.checkout} onPress={() => {
          navigation.navigate('Checkout');
        }}>
          <Text style={{ color: '#fff' }}>CheckOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: '70%',
    height: '60%',
    backgroundColor: '#ff8605',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
