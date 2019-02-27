import * as React from 'react';
import styled from 'styled-components';
import AdapterTag from '../AdapterTag';
import { Card } from '..';
import { Link } from 'react-router-dom';

class AdapterCard extends React.Component {
    render() {
        return (
            <CardContainer>
                <Link to={this.props.link || ""}>
                    <Card>
                        <Title>{this.props.title}</Title>
                        <Subtitle>{this.props.subtitle}</Subtitle>
                        {this.props.tags.map((tag, index) => <AdapterTag key={`label-${index}`} label={tag} startColor="#9277EE" endColor="#874AE2" />)}
                    </Card>
                </Link>
            </CardContainer>
        );
    }
}

const CardContainer = styled.div`
flex-grow: 1;
margin: 10px;
`;

const Title = styled.div` 
font-size: 20px;
color: #000;
`;

const Subtitle = styled.div` 
font-size: 18px;
color: #4A4A4A;
`;

export default AdapterCard;
