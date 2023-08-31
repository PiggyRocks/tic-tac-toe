import styled from 'styled-components';

const Cell = styled.button`
height: 80px;
width: 80px;
border: none;
border-radius: 50%;
background-color: '#B7D7E4';
background-color: ${props =>
props.cell ? (props.cell === "X"? "#47ed65" : "#f04a30")
: "#B7D7E4"
} ;
&:hover {
    transform: scale(1.1); 
};
`;

export default Cell;