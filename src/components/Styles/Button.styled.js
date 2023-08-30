import styled from "styled-components"

const Button = styled.button`
border-radius: 10px;
background-color: ${({currentPlayer})=> currentPlayer? '#f5f111' : '#949491'};
color: white;

}
`;
export default Button;