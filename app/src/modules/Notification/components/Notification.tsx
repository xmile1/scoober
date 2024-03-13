import styled from 'styled-components';
const StyledNotification = styled.div`
  position: fixed;
  bottom: 84px;
  right: 30px;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  padding: 18px 36px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Notification = ({ message }: { message: string }) => {
  return <StyledNotification>{message}</StyledNotification>;
};

export default Notification;
