import styled, { css } from 'styled-components';

interface StepProps {
  complete?: boolean;
}

export const Step = styled.div<StepProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: ${props => props.complete ? '#2B676F' : 'rgba(144,221,239,1)' } ;
  border-radius: 50%;
  svg {
    color: ${props => props.complete ? '#fff' : '#b4edfa' } ;
  }
`;

export const StepLine = styled.div<StepProps>`
  background-color: ${props => props.complete ? '#2B676F' : '#fff' } ;
  border: 2px solid ${props => props.complete ? '#2B676F' : '#fff' } ;
  width: 50px;
  height: 0px;
`;