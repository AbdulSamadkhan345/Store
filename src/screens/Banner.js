/* eslint-disable react-native/no-inline-styles */
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Image,
  } from 'react-native';
  import React from 'react';
  import Swiper from 'react-native-swiper';
  import {useState} from 'react';
  import {useEffect} from 'react';

  var {width} = Dimensions.get('window');

  export default function Banner() {
    const [BannerData, setBannerData] = useState([]);

    useEffect(() => {
      setBannerData([
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEskbZHHh8l9TK2Fs9jLtP9bS5KqMoqb4GXw&usqp=CAU',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKATzhh1OyopjRdI3bN9Ufa2w0A6tTIf5c-g&usqp=CAU',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5VRPViOx9yqLKrg0NErQZLYmRU9Qg317vQ&usqp=CAU',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0bhk7LedhVogtsEBEFIOscOpBoxQldPt9g&usqp=CAU',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjttapCe5spEDBmN7fPg2aMp9pf2Lsi6v8g&usqp=CAU',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktbtJLPF7c0ycPPGmHkYoL0_MHO0tuAyJdh9tP8rdlIBa-WW5S0bhLp5bent-2gHE5Yo&usqp=CAU',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYdDeTuoOKRa1Fg1gjnp5EmwtiBUxsEBTJ5iTyGxrQnWE2qxX1Qgiv2XRfp1tW9m0m9g&usqp=CAU',
         'https://www.crushpixel.com/big-static18/preview4/online-shopping-on-mobile-application-2916088.jpg',
    ]);
      return () => {
        setBannerData([]);
      };
    }, []);

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.swiper}>
            <Swiper
              showButtons={false}
              autoplay={true}
              autoplayTimeout={4}
              style={{
                height: width / 2,
              }}>
              {BannerData.map(item => {
                return (
                  <Image
                    key={item}
                    resizeMode="contain"
                    source={{uri: item}}
                    style={styles.banner}
                  />
                );
              })}
            </Swiper>
            <View style={{height: 20}} />
          </View>
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    swiper: {
      width: width,
      marginTop: '5%',
      alignItems: 'center',
    },
    banner: {
      height: width / 2,
      width: width - 40,
      borderRadius: 10,
      marginHorizontal: 20,
    },
  });
