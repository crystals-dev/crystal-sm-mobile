import { Ionicons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";
import main from "../theme/main";
import { iconProp } from "../types/iconProp";
import Hr from "./Hr";

export interface IMenuList {
    title: string;
    icon: iconProp;
    onPress?: () => void;
    danger?: boolean;
}
const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
`;
export const Text = styled.Text`
    font-size: 20px;
    color: ${main.text};
`;


export default function MenuList({ propList }: {propList: IMenuList}): JSX.Element {

    const { icon, title, danger, onPress } = propList;

    return(
        <>
            <Container onPress={onPress}>
                <Ionicons name={icon} color={danger ? "#f00" : main.text} size={35} />
                <Text style={{
                    marginLeft: 20,
                    color: danger ? "#f00" : main.text
                }}>{title}</Text>
            </Container>
            <Hr />
        </>
    );
}
