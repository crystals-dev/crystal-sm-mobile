import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./src/types/RootStackParamList";
import Home from "./src/views/Home";
import Preload from "./src/views/Preload";
import SignIn from "./src/views/SignIn";
import SignUp from "./src/views/SignUp";
import Verify from "./src/views/Verify";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Preload" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Preload" component={Preload} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Verify" component={Verify} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/**
 * 
 * <NavigationContainer>
            <Stack.Navigator initialRouteName="Preload" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Preload" component={Preload} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>

 */
