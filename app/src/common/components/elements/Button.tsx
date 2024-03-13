import { styled } from "styled-components";


export const BaseButton = styled.button`
  background-color: var(--color-button);
  color: var(--color-primary);
  font-weight: 700;
  border: none;
  padding: 10px 48px;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-button-active);
    color: var(--color-button-active-text);
  }
`;

export const RoundButton = styled(BaseButton)`
  border-radius: 50%;
  padding: 10px;
  height: 56px;
  width: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-button-text);
  box-shadow: 0px 1px 8px 0px rgba(29, 33, 55, 0.12), 0px 3px 4px 0px rgba(29, 33, 55, 0.14),
    0px 3px 3px 0px rgba(29, 33, 55, 0.12);
`;

const buttonVariants = {
  base: BaseButton,
  round: RoundButton,
}

type ButtonVariant = keyof typeof buttonVariants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export const Button = ({ children, variant = "base", ...props }: ButtonProps) => {
  const ButtonComponent = buttonVariants[variant];
  return <ButtonComponent {...props}>{children}</ButtonComponent>;
};
