import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootStackParamList } from "../../types/RootStackParamList";
import Chat from "../Chat";
import Feed from "../Feed";
import Notifications from "../Notifications";
import Settings from "../Settings";
import {Ionicons} from "@expo/vector-icons";
import main from "../../theme/main";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Home(): JSX.Element {

    return (
        <Tab.Navigator initialRouteName="Feed" screenOptions={{
            tabBarInactiveBackgroundColor: main.pDark,
            tabBarActiveBackgroundColor: main.pDark,
            headerStyle: {
                backgroundColor: main.sDark
            },
            headerTitleStyle: {
                color: main.text,
                fontSize: 20
            }
        }}>
            <Tab.Screen name="Feed" component={Feed} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={26} />
            }} />
            <Tab.Screen name="Chat" component={Chat}  options={{
                tabBarLabel: "Chat",
                tabBarIcon: ({ color }) => <Ionicons name="chatbox" color={color} size={26} />
            }} />
            <Tab.Screen name="Notifications" component={Notifications}  options={{
                tabBarLabel: "Notifications",
                tabBarIcon: ({ color }) => <Ionicons name="notifications" color={color} size={26} />
            }} />
            <Tab.Screen name="Menu" component={Settings}  options={{
                tabBarLabel: "Menu",
                tabBarIcon: ({ color }) => <Ionicons name="menu" color={color} size={26} />
            }} /> 
        </Tab.Navigator>
    );
}
