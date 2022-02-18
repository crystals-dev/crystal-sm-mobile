import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { testLogin } from "../../services/api";
import main from "../../theme/main";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Container, Image } from "./styles";

type PreloadScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, "Preload">;

export default function Preload(): JSX.Element {
    
    const navigation = useNavigation<PreloadScreenNavigationProps>();

    useEffect(() => {
        testLogin().then(res => {
            console.log(res.data);
            if(!res.data.success) {
                navigation.reset({ routes: [ { name: "SignIn" } ] });
                return;
            }
            navigation.reset({ routes: [{ name: "Home" }] });
            return;
        }).catch(() => {
            navigation.reset({ routes: [ { name: "SignIn" } ] });
            return;
        });
    }, []);

    return(
        <Container>
            <Image source={require("../../files/logo.png")} />
            <ActivityIndicator size="large" color={main.text} style={{
                marginTop: 50
            }} />
        </Container>
    );
}
