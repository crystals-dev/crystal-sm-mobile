import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import main from '../../theme/main';
import { Container, Image } from './styles';

export default function Preload(): JSX.Element {
    
    useEffect(() => {
        //
    }, []);

    return(
        <Container>
            <Image source={require('../../files/logo.png')} />
            <ActivityIndicator size="large" color={main.text} style={{
                marginTop: 50
            }} />
        </Container>
    );
}
