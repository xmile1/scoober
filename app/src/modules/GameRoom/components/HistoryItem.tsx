import { useEffect, useRef } from "react";
import { Text } from "@/common/components";
import { HistoryItemLayout, SelectedNumber, TextRectangle } from "../styles/HistoryItem.styles";
import myAvatarIcon from "@/assets/icons/my-avatar.svg";
import opponentAvatarIcon from "@/assets/icons/jet-avatar.svg";
import { HistoryItem as HistoryItemModel } from "@/common/models/room";

const formatSelectedNumber = (selectedNumber: number) => {
  return selectedNumber > 0 ? `+${selectedNumber}` : selectedNumber.toString();
};

type HistoryItemProps = {
  item: HistoryItemModel;
  username: string;
};

export const HistoryItem = ({ item, username }: HistoryItemProps) => {
  const historyItem = useRef<HTMLDivElement>(null);
  const isMyPlayer = (user: string) => user === username;
  const playerRole = isMyPlayer(item.user) ? "My player" : "Opponent";

  useEffect(() => {
    const timer = setTimeout(() => {
      historyItem.current?.style.setProperty("opacity", "1");
    }, 10);
    return () => clearTimeout(timer);
  }, [historyItem]);

  return (
    <HistoryItemLayout
      ref={historyItem}
      isRight={isMyPlayer(item.user)}
      key={item.id}
      aria-label={`History item for ${playerRole}`}
      style={{ opacity: 0, transition: "opacity 0.5s ease-in-out" }}
    >
      <img
        src={isMyPlayer(item.user) ? myAvatarIcon : opponentAvatarIcon}
        alt={`${playerRole} avatar`}
      />
      <SelectedNumber isRight={isMyPlayer(item.user)}>
        <Text
          size="xl"
          weight="bold"
          color="alternative-text"
          aria-label={`${playerRole} selected number: ${formatSelectedNumber(item.selectedNumber)}`}
        >
          {formatSelectedNumber(item.selectedNumber)}
        </Text>
      </SelectedNumber>
      <TextRectangle isRight={isMyPlayer(item.user)}>
        <Text size="s">
          {`[ ( ${formatSelectedNumber(item.selectedNumber)} + ${item.number} ) / 3 ] = ${item.result}`}
        </Text>
      </TextRectangle>
      <TextRectangle isRight={isMyPlayer(item.user)}>
        <Text size="s" aria-label={`${playerRole} result ${item.result}`}>
          {item.result}
        </Text>
      </TextRectangle>
    </HistoryItemLayout>
  );
};
