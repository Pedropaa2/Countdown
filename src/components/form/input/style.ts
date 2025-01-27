import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5em 1em;
  font-size: 1em;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
  width: 30px;
  height: 30px;
 

  &:focus {
    border-color: #007bff;
  }
`;


export default StyledInput;