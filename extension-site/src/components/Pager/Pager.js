import * as React from 'react';
import styled from 'styled-components';

class Pager extends React.Component {
    render() {
        return (
            <PagerDiv>
                {this.props.children}
            </PagerDiv>
        );
    }
}

const PagerDiv = styled.div`
left: 400px;
top: 0;
right: 0;
bottom: 0;
position: absolute;
padding: 20px;
`;

export default Pager;