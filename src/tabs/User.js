/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../screens/coomon/Header';
import { useNavigation } from '@react-navigation/native';

const User = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <Image source={require('../Images/profile.png')} style={styles.userimg} />
      <Text style={styles.user}>{'AbdulSamad'}</Text>
      <Text style={[styles.user, { fontSize: 16, marginTop: 0 }]}>{'askhan1308@gmail.com'}</Text>
      <TouchableOpacity style={[styles.tab, { marginTop: 40 }]}
      onPress={()=>{
        navigation.navigate('Login');
      }}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}
      onPress={()=>{
        navigation.navigate('Orders');
      }}>
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}
        onPress={() => {
          navigation.navigate('Addresses');
        }}>
        <Text style={styles.txt}>Addresses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userimg: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 50,
  },
  user: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
  },
});
