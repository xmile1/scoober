import { Provider } from 'react-redux';
import "./reset.css";
import "./theme.css";

import { setupStore } from './store';
import { Rooms } from "@/pages/Rooms/Rooms";
import { NotificationProvider } from "./modules/Notification";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Rooms />
      </NotificationProvider>
    </Provider>
  );
}

export default App;
