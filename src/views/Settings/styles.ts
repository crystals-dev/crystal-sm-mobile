import { Platform, SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import main from "../../theme/main";

export const Container = styled(Platform.OS === "android" ? View : SafeAreaView)`
    flex: 1;
    background-color: ${main.sDark};
`;

export const UserInfoContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
`;
export const Image = styled.Image`
    height: 50px;
    width: 50px;
    border-radius: 25px;
`;
export const Text = styled.Text`
    font-size: 18px;
    color: ${main.text};
    font-weight: bold;
`;
