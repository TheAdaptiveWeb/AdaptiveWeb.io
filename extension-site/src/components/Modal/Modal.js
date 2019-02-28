import * as React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { Card } from '..';

class Modal extends React.Component {
    render() {
        return (
            <ModalContainer>
                <CardContainer>
                    <Card>
                        {this.props.children}
                    </Card>
                </CardContainer>
                <ModalBackground />
            </ModalContainer>
        );
    }
}

const ModalContainer = styled.div`
top: 0;
left: 400px;
bottom: 0;
right: 0;
position: fixed;
display: flex;
justify-content: center;
align-items: center;
`;

const ModalBgFrames = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 0.77;
}
`;

const ModalBackground = styled.div`
background: linear-gradient(45deg, ${props => props.theme.accent.light} 0%, ${props => props.theme.accent.dark} 100%);
position: fixed;
top: 0;
left: 400px;
right: 0;
bottom: 0;
opacity: 0.77;
animation: ${ModalBgFrames} 0.5s ease-in-out;
`;

const CardKeyFrames = keyframes`
0% {
    transform: scale(0);
}
100% {
    transform: scale(1);
}
`;

const CardContainer = styled.div`
max-width: 500px;
width: 100%;
padding: 20px;
animation: ${CardKeyFrames} 0.5s ease-in-out;
z-index: 100;
`;

export default Modal;