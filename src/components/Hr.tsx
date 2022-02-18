import React from "react";
import styled from "styled-components/native";
import main from "../theme/main";

const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${main.text};
    margin-bottom: 10px;
    margin-top: 10px;
`;
export default function Hr(): JSX.Element {
    return(
        <Line />
    );
}
