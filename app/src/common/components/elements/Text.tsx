import styled from "styled-components";

const sizeStyle = {
  s: "12px",
  m: "14px",
  l: "18px",
  xl: "24px",
};

type TextProps = {
  size?: keyof typeof sizeStyle;
  weight?: "bold" | "normal";
  color?: string;
};

export const Text = styled.p<TextProps>`
  font-size: ${({ size }) => sizeStyle[size ?? "m"]};
  font-weight: ${({ weight }) => (weight === "bold" ? "700" : "400")};
  ${({ color }) => `color: var(--color-${color ?? 'text'});`}
`;

