import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Container, Title, Row, SubmitButton, SubmitTextButton, Text as TextA, Input } from "../SignIn/styles";
import { Image } from "../Preload/styles";
import main from "../../theme/main";
import LinkButton from "../../components/LinkButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { resend, verify } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: "center", fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 60,
        height: 60,
        marginLeft: 5,
        marginRight: 5,
        lineHeight: 38,
        paddingTop: 10,
        fontSize: 35,
        borderWidth: 2,
        borderColor: main.secondary,
        color: main.text,
        textAlign: "center",
    },
    focusCell: {
        borderColor: main.text,
    },
});
  
const CELL_COUNT = 6;

type Props = NativeStackScreenProps<RootStackParamList, "Verify">;

export default function Verify({ navigation, route }: Props): JSX.Element {
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSendEmail, setLoadingSendEmail] = useState(false);
    
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const onSubmit = () => {
        if(!loading) {
            if((route.params.email === "" || !route.params.email) && email === "") {
                Alert.alert("Warning", "Can't find your email!");
                return;
            }
            if(value === "") {
                Alert.alert("Warning", "Invalid code!");
                return;
            }
            setLoading(true);
            verify(route.params.email === "" || !route.params.email ? email : route.params.email, Number(value))
                .then(async ({ message, success, token }) => {
                    if(!success) {
                        Alert.alert("Warning!", message || "An error ocurred!");
                        return;
                    }
                    await AsyncStorage.setItem("@token", token);
                    Alert.alert("Sucess!", "Email verified!");
                    navigation.reset({ routes: [ { name: "Home" } ] });
                }).catch(() => {
                    Alert.alert("Error!", "An error ocurred!");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const resendEmailRequest = () => {
        if(!loadingSendEmail) {
            if((route.params.email === "" || !route.params.email) && email === "") {
                Alert.alert("Warning", "Can't find your email!");
                return;
            }
            setLoadingSendEmail(true);
            resend(route.params.email === "" || !route.params.email ? email : route.params.email)
                .then(({ success, message }) => {
                    if(!success) {
                        Alert.alert("Warning!", message || "An error ocurred!");
                        return;
                    }
                    Alert.alert("Sucess!", "We send a new email!");
                }).catch(() => {
                    Alert.alert("Error!", "An error ocurred!");
                })
                .finally(() => {
                    setLoadingSendEmail(false);
                });
        }
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
            {route.params.email === "" || !route.params.email ? <Input autoCapitalize="none" autoCompleteType="email" keyboardType="email-address" autoCorrect={false} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={main.pDark} /> : null}
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />       
            <SubmitButton style={{
                marginTop: 20
            }} onPress={onSubmit}>
                {loading ? <ActivityIndicator color={main.text} /> : <SubmitTextButton>Confirm</SubmitTextButton>}
            </SubmitButton>
            <Row style={{
                marginTop: 10
            }}>
                {loadingSendEmail ? <ActivityIndicator color={main.text} /> : (
                    <>
                        <View>
                            <TextA>Did not get the email?</TextA>
                        </View>
                        <View style={{
                            marginLeft: 5
                        }}>
                            <LinkButton onPress={() => {
                                resendEmailRequest();
                            }}>Resend</LinkButton> 
                        </View>
                    </>
                )}
            </Row>
        </Container>
    );
}
