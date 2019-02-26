import * as React from 'react';
import { Logo } from '../';
import styled from 'styled-components';

class Masthead extends React.Component {
    render() {
        return (
            <MastheadDiv>
                <Logo />
                <Title>The Adaptive Web</Title>
                <Subtitle>Adaptive Web Accessibility Toolkit</Subtitle>
            </MastheadDiv>
        );
    }
}

const MastheadDiv = styled.div`
padding: 20px;
text-align: center;
`;

const Title = styled.div`
font-size: 32px;
margin-top:10px;
`;

const Subtitle = styled.div`
font-size: 20px;
color: #4A4A4A;
`;

export default Masthead;
