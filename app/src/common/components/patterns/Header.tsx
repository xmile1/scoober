import logo from "@/assets/jet-logo.svg";
import styled from "styled-components";
import { Text } from "@/common/components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--color-brand-dark);
  gap: 16px;
  color: var(--color-alternative-text);
`;

export const Header = ({ opponentName }: { opponentName: string }) => {
  return (
    <HeaderWrapper>
      <img src={logo} alt="Company logo" />
      <div>
        <Text as="h3" weight="bold" color="alternative-text" size="l">
          Playing with {opponentName}
        </Text>
        <Text color="alternative-text">
          Win the game or win the job
        </Text>
      </div>
    </HeaderWrapper>
  );
};


