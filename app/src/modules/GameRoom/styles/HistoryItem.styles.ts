import styled from "styled-components";

export const HistoryItemLayout = styled.div<{ isRight: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  align-items: flex-start;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  ${({ isRight }) =>
    isRight &&
    `
  justify-items: flex-end;
  grid-template-columns: 1fr auto;
`}
`;

export const SelectedNumber = styled.div<{ isRight: boolean }>`
  ${({ isRight }) => isRight && "grid-column: 1; grid-row: 1;"}
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isRight }) =>
    isRight ? "var(--color-button-active)" : "var(--color-selected-answer)"};
  color: var(--color-alternative-text);
`;

export const TextRectangle = styled.div<{ isRight: boolean }>`
  grid-column: ${({ isRight }) => (isRight ? "1" : "2")};
  padding: 8px;
  background-color: var(--color-background-secondary);
  color: var(--color-text);
  width: 200px;
  border-radius: 4px;
`;
