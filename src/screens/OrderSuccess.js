import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const OrderSuccess = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../Images/success.png')}
       style={styles.icon}/>
       <Text style={styles.msg}>Order Placed Successfully...</Text>
       <Text>You will be informed about your order after 30 mins..</Text>
       <TouchableOpacity style={styles.btn}
       onPress={()=>{
        navigation.navigate('MAIN');
       }}>
        <Text>Go To Home</Text>
       </TouchableOpacity>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    icon:{
        width:100,
        height:100,
    },
    msg:{
        marginTop:20,
        fontSize:16,
    color:'#000',
    },
    btn:{
        padding:15,
        borderWidth:1,
        color:'black',
        marginTop:20,
    },
});
