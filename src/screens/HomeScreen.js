/* eslint-disable eqeqeq */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
}
  from 'react-native';
import React, { useEffect, useState } from 'react';
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import WishList from '../tabs/WishList';
import Notification from '../tabs/Notification';
import User from '../tabs/User';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (<Home />) :
        selectedTab == 1 ? (<Search />) :
          selectedTab == 2 ? (<WishList />) :
            selectedTab == 3 ? (<Notification />) :
              (<User />)}
              {!isKeyboardVisible && (<View style={styles.bottomView} >
        <TouchableOpacity style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image source=
            {selectedTab == 0 ?
              require('../Images/home_fill.png') :
              require('../Images/home.png')}
            style={styles.bottomTabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image source={selectedTab == 1 ?
            require('../Images/search_fill.png') :
            require('../Images/search.png')}
            style={styles.bottomTabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image source={selectedTab == 2 ?
            require('../Images/heart_fill.png') :
            require('../Images/heart.png')}
            style={styles.bottomTabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image source={selectedTab == 3 ?
            require('../Images/noti_fill.png') :
            require('../Images/noti.png')}
            style={styles.bottomTabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image source={selectedTab == 4 ?
            require('../Images/user_fill.png') :
            require('../Images/user.png')}
            style={styles.bottomTabIcon} />
        </TouchableOpacity>
      </View>)}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottomTab: {
    width: '20%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
