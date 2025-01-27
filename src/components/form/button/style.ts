import styled from 'styled-components';

const StyledButton = styled.button`
  background: linear-gradient(135deg, #6d5dfc, #c76dfd);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid #c76dfd;
    outline-offset: 3px;
  }

 
`;

export default StyledButton;