import styled from "styled-components";
import jetFullLogo from '@/assets/jet-full-logo.svg'
import { Text } from "../elements/Text";

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--color-primary-dark);
  gap: 16px;
  color: var(--color-alternative-text);
  justify-content: space-between;
`;

const FooterRight = styled.p`
  display: flex;
  gap: 40px;
`;

const Copyright = styled(Text)`
  opacity: 0.5;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <img src={jetFullLogo} alt="Company Logo" />
      <FooterRight>
        <Text size="s" color="alternative-text">Cookie statment</Text>
        <Copyright size="s" color="alternative-text">© 2021 Takeaway.com</Copyright>
      </FooterRight>
    </FooterWrapper>
  );
};
