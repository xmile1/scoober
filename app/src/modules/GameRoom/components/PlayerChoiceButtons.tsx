import { Button } from "@/common/components";
import styled from "styled-components";

export const ActionButtonsLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

type PlayerChoiceButtonsProps = {
  myTurn: boolean;
  selectAnswer: (answer: number) => void;
};

export const PlayerChoiceButtons = ({
  myTurn,
  selectAnswer,
}: PlayerChoiceButtonsProps) => {
  const actionButtons = [
    { label: "-1", value: -1 },
    { label: "0", value: 0 },
    { label: "+1", value: 1 },
  ];

  return myTurn ? (
    <ActionButtonsLayout>
      {actionButtons.map((button) => (
        <Button key={button.value} onClick={() => selectAnswer(button.value)} variant="round">
          {button.label}
        </Button>
      ))}
    </ActionButtonsLayout>
  ) : null;
};
