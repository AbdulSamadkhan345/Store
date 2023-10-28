/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickleftIcon,
  onClickRightIcon,
  isCart,
}) => {
  const cartItems = useSelector(state => state.cart);
  console.log(cartItems);
  const navigation = useNavigation();
  return (
    <View style={styles.header} >
      <TouchableOpacity style={styles.btn}
        onPress={() => {
          onClickleftIcon();
        }}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}
      {isCart && (<TouchableOpacity style={styles.btn} onPress={() => {
        navigation.navigate('Cart');
      }} >
        <Image source={rightIcon}
          style={[styles.icon, { width: 35, height: 35 }]} />
        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#fff',
          position: 'absolute',
          right: -7,
          top: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ color: '#000', top: -1 }}>
            {cartItems.data.length}
          </Text>
        </View>
      </TouchableOpacity>)}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});
