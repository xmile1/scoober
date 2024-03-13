import "./reset.css";
import "./theme.css";
import { Rooms } from "@/pages/Rooms/Rooms";
import { NotificationProvider } from "./modules/Notification";

function App() {
  return (
    <NotificationProvider>
      <Rooms />
    </NotificationProvider>
  );
}

export default App;
