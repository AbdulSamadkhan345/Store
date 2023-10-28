import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import ProductDetail from '../tabs/ProductDetail';
import Cart from '../tabs/Cart';
import Login from './Login';
import Signup from './Signup';
import Checkout from './Checkout';
import Addresses from './Addresses';
import AddAddresses from './AddAddresses';
import OrderSuccess from './OrderSuccess';
import Orders from './Orders';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MAIN"
                    component={Main}
                    options={{ headerShown: false }} />
                    <Stack.Screen name="ProductDetail"
                    component={ProductDetail}
                    options={{ headerShown: false }} />
                    <Stack.Screen name="Cart"
                    component={Cart}
                    options={{ headerShown: false }} />
                    <Stack.Screen name="Login"
                    component={Login}
                    options={{ headerShown: false }} />
                    <Stack.Screen name="Signup"
                    component={Signup}
                    options={{ headerShown: false }} />
                    <Stack.Screen name="Checkout"
                    component={Checkout}
                    options={{ headerShown: false }} />
                     <Stack.Screen name="Addresses"
                    component={Addresses}
                    options={{ headerShown: false }} />
                     <Stack.Screen name="AddAddresses"
                    component={AddAddresses}
                    options={{ headerShown: false }} />
                     <Stack.Screen name="OrderSuccess"
                    component={OrderSuccess}
                    options={{ headerShown: false }} />
                    <Stack.Screen name="Orders"
                    component={Orders}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
