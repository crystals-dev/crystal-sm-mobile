import { Platform, SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import main from "../../theme/main";

export const Container = styled(Platform.OS === "android" ? View : SafeAreaView)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${main.primary};
`;
export const Input = styled.TextInput`
    height: 40px;
    width: 95%;
    background-color: ${main.secondary};
    border-radius: 5px;
    padding-left: 5px;
    font-size: 18px;
    margin-bottom: 5px;
`;
export const SubmitButton = styled.TouchableOpacity`
    height: 40px;
    width: 95%;
    background-color: ${main.pDark};
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;
export const SubmitTextButton = styled.Text`
    font-size: 18px;
    color: ${main.text};
`;
export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Text = styled.Text`
    font-size: 18px;
    color: ${main.text};
`;
export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${main.text};
`;
