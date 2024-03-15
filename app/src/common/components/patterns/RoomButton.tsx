import styled from "styled-components";
import arrowRightIcon from "@/assets/icons/arrow-right.svg";
import { Button } from "../elements/Button";

interface WrapperProps {
  isActive?: boolean;
}

const Wrapper = styled(Button)<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0;
  padding: 16px 16px 16px 24px;
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover, &:focus {
    background-color: var(--color-button-active);
    p {
      color: var(--color-alternative-text);
    }
  }

  ${(props) =>
    props.isActive &&
    `
    background-color: var(--color-button-active);
    p {
      color: var(--color-alternative-text);
    }
  `}
`;

type RoomButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

export const RoomButton = ({ children, onClick, isActive }: RoomButtonProps) => {
  return (
    <Wrapper onClick={onClick} isActive={isActive} aria-pressed={isActive ? "true" : "false"}>
      {children} <img src={arrowRightIcon} alt="Go to room" />
    </Wrapper>
  );
};
