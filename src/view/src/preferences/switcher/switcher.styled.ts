import styled from 'styled-components';

export const SwitcherContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SwitcherVariants = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface ISwitcherButtonProps {
  active: boolean;
}

export const SwitcherButton = styled.button.attrs(
  ({ active }: ISwitcherButtonProps) => ({
    disabled: active,
  })
)<ISwitcherButtonProps>`
  border: none;
  cursor: pointer;
  background-color: #38383d;
  color: #6d6d75;
  border: none;
  border-radius: 10px;
  padding: 10px;

  &:hover {
    color: #ffffff;
  }

  &:disabled {
    color: #ffffff;
  }

  & + & {
    margin-left: 5px;
  }
`;

export const Description = styled.span`
  color: #ffffff;
`;
