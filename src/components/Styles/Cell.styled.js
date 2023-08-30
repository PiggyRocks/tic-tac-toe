import styled from 'styled-components';

const Cell = styled.button`
height: 100px;
width: 100px;
border-radius: 50%;
background-color: '#B7D7E4';
background-color: ${props =>
props.cell ? (props.cell === "X"? "#47ed65" : "#f04a30")
: "#B7D7E4"
} ;
cursor: ${props=> props.clicked ? "not-allowed" : "pointer"};
`;


export default Cell;