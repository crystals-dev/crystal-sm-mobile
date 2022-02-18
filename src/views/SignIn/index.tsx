import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import LinkButton from "../../components/LinkButton";
import { login } from "../../services/api";
import main from "../../theme/main";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Image } from "../Preload/styles";
import { Container, Input, Row, SubmitButton, SubmitTextButton, Text, Title } from "./styles";

type SignInScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, "SignIn">;

export default function SignIn(): JSX.Element {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation<SignInScreenNavigationProps>();

    const onSubmit = () => {
        login(email, password)
            .then(async ({ message, success, token }) => {
                if(!success) {
                    Alert.alert("Warning", message || "An error ocurred!");
                    return;
                }
                await AsyncStorage.setItem("@token", token);
                navigation.reset({ routes: [{ name: "Home" }] });
            })
            .catch(() => {
                Alert.alert("Error!", "An error ocurred!");
            });
    };

    return(
        <Container>
            <Image style={{
                marginBottom: 40
            }} source={require("../../files/logo.png")} />
            <Title>Share.</Title>
            <Title style={{
                fontSize: 18,
                fontWeight: "normal",
                marginBottom: 20
            }}>Enjoy the freedom and privacy</Title>
            <Input autoCapitalize="none" autoCompleteType="email" keyboardType="email-address" autoCorrect={false} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={main.pDark} />
            <Input secureTextEntry value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={main.pDark} />
            <SubmitButton onPress={onSubmit}>
                <SubmitTextButton>Sign in</SubmitTextButton>
            </SubmitButton>
            <Row style={{
                marginTop: 10
            }}>
                <View>
                    <Text>{"Don't have an account yet?"}</Text>
                </View>
                <View style={{
                    marginLeft: 5
                }}>
                    <LinkButton onPress={() => {
                        navigation.navigate("SignUp");
                    }}>Sign up</LinkButton> 
                </View>
            </Row>
        </Container>
    );
}
