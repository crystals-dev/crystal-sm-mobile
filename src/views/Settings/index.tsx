import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Hr from "../../components/Hr";
import MenuList, { IMenuList } from "../../components/MenuList";
import { getUser, IUser } from "../../services/api";
import { BASE_URL } from "../../services/constants";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Container, Image, UserInfoContainer, Text } from "./styles";

type SettingsProps = NativeStackNavigationProp<RootStackParamList, "Menu">;

export default function Settings(): JSX.Element {

    const [user, setUser] = useState<IUser | null>(null);
    const navigation = useNavigation<SettingsProps>();

    const menuList: Array<IMenuList> = [
        {
            icon: "person-add",
            title: "Invites"
        },
        {
            icon: "people",
            title: "Friends"
        },
        {
            icon: "help-buoy",
            title: "Help"  
        },
        {
            icon: "exit",
            title: "Log out",
            onPress: async () => {
                await AsyncStorageLib.clear();
                navigation.reset({ routes: [{ name: "Preload" }] });
            },
            danger: true
        }
    ];

    useEffect(() => {
        getUser()
            .then(res => {
                if(res.success) {
                    setUser(res.user);
                }
            });
    }, []);

    return(
        <Container>
            <UserInfoContainer>
                <Image source={{ uri: `${BASE_URL}/cdn/${user ? user.profile : "none.png"}` }} />
                <Text style={{
                    marginLeft: 20
                }}>{user && `${user.first_name} ${user.last_name}`}</Text>
            </UserInfoContainer>
            <Hr />
            {menuList.map((item, i) => <MenuList propList={item} key={i} />)}
        </Container>
    );
}
