import styled from "styled-components";

const Container = styled.div `
display: grid;
grid-template-columns: repeat(${({size}) => size}, 1fr);
grid-template-rows: repeat(${({size}) => size}, 1fr);
gap: 10px;

`;
export default Container;