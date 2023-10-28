import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../screens/coomon/Header';
import { useNavigation } from '@react-navigation/native';
import Banner from '../screens/Banner';
import { useDispatch } from 'react-redux';
import { addProducts } from '../redux/slices/ProductsSlice';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  });
  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        json.map(item => {
          item.qty = 1;
        });
        dispatch(addProducts(json));
      });
  };
  return (
    <View style={styles.container}>
      <Header leftIcon={require('../Images/menu.png')}
        rightIcon={require('../Images/cart.png')}
        title={'empty'}
        onClickleftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      />
      <Banner />
      <FlatList
        data={products}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', { data: item });
              }}
            >
              <Image source={{ uri: item.image }}
                style={styles.itemImage} />
              <View>
                <Text style={styles.name}>
                  {item.title.length > 25
                    ? item.title.substring(0, 25)
                    + '...' : item.title}
                </Text>
                <Text style={styles.desc}>
                  {item.description.length > 30
                    ? item.description.substring(0, 30)
                    + '...' : item.description}
                </Text>
                <Text style={styles.price}>
                  {'$' + item.price}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        style={styles.FlatList}
      />
    </View>

  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatList: {
    height: 580,
  },
  itemImage: {
    width: 100,
    height: 100,

  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
});
