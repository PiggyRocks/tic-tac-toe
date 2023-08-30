import styled from "styled-components"

const Button = styled.button`
border-radius: 10px;
background-color: ${({click})=> click ? '#47ed66' :'#d1cdcd'};
color: white;
}
`;
export default Button;