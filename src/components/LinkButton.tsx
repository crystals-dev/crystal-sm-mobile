import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import main from "../theme/main";

const Button = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;
const Text = styled.Text`
    font-size: 18px;
    color: ${main.secondary};
`;

interface IButtonProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>
}

const LinkButton: React.FC<IButtonProps> = ({ children, onPress, style }) => {
    return(
        <Button onPress={onPress} style={style}>
            <Text>{children}</Text>
        </Button>
    );
};

export default LinkButton;
