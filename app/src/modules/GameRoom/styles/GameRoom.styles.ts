import { Text } from "@/common/components";
import styled from "styled-components";

export const GameRoomLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: -webkit-fill-available;
  height: calc(100vh - 150px);
  padding: 16px;
  padding-bottom: 36px;
  margin-right: 24px;
  background-color: var(--color-background);
  overflow: auto;
`;

export const WaitingForOpponent = styled(Text)`
  display: flex;
  justify-content: center;
  padding: 16px;
`;
