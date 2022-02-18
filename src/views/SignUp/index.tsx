import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Dimensions, Alert, ActivityIndicator } from "react-native";
import LinkButton from "../../components/LinkButton";
import { register } from "../../services/api";
import main from "../../theme/main";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Image } from "../Preload/styles";
import { Container, Input, Row, SubmitButton, SubmitTextButton, Text, Title } from "./styles";

function getPerc(dimension: number, percentage: number): number {
    const p = percentage / 100;
    return dimension * p;
}

type SignUpScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export default function SignUp(): JSX.Element {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<SignUpScreenNavigationProps>();

    const onSubmit = () => {
        if(firstName === "" || lastName === "" || email === "" || password === "") {
            Alert.alert("Warning", "Fill all fields");
            return;
        }
        setLoading(true);
        register(firstName, lastName, email, password)
            .then(({ message, success }) => {
                if(!success) {
                    Alert.alert("Warning!", message || "An error ocurred!");
                    return;
                }
                Alert.alert("Sucess!", "Account created! Please, verify your email!");
                navigation.navigate("Verify", { email });
            })
            .catch(() => {
                Alert.alert("Error!", "An error ocurred!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return(
        <Container>
            <Image style={{
                marginBottom: 40
            }} source={require("../../files/logo.png")} />
            <Title>Connect.</Title>
            <Title style={{
                fontSize: 18,
                fontWeight: "normal",
                marginBottom: 20
            }}>Enjoy the freedom and privacy. Create an account</Title>
            <Row>
                <Input autoCapitalize="words" autoCompleteType="name" autoCorrect={false} style={{
                    width: (getPerc(Dimensions.get("window").width, 95) / 2) - 5,
                }} placeholder="First name" placeholderTextColor={main.pDark} value={firstName} onChangeText={setFirstName} />
                <Input autoCapitalize="words" autoCompleteType="name" autoCorrect={false} style={{
                    width: (getPerc(Dimensions.get("window").width, 95) / 2) - 5,
                    marginLeft: 10
                }} placeholder="Last name" placeholderTextColor={main.pDark} value={lastName} onChangeText={setLastName} /> 
            </Row>
            <Input autoCapitalize="none" autoCompleteType="email" keyboardType="email-address" autoCorrect={false} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={main.pDark} />
            <Input secureTextEntry value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={main.pDark} />
            <SubmitButton onPress={onSubmit}>
                {loading ? <ActivityIndicator color={main.text} /> : <SubmitTextButton>Sign up</SubmitTextButton>}
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
                        navigation.goBack();
                    }}>Sign in</LinkButton> 
                </View>
            </Row>
        </Container>
    );
}
