import styled from "styled-components"

const Button = styled.button`
border-radius: 10px;
background-color: indianred;
color: white;
height: 60px;
width: 60px;
border-radius: 50px;
text-align: center;
font-size: 30px;
border: none;
&:hover {
    transform: scale(1.1); 
};
}
`;
export default Button;