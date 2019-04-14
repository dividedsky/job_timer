import styled, { css } from 'styled-components';

const Clock = styled.h3`
  background-color: lightgray;
  font-size: 20px;
  border: 2px solid red;
  border-radius: 5px;
  padding: 10px;
  width: 20%;
  margin: 10px auto;
  color: #020202;

  ${props => props.running
  && css`
      border: 2px solid green;
    `};
`;

export default Clock;
