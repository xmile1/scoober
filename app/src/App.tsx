import "./reset.css";
import "./theme.css";
import { Rooms } from "@/pages/Rooms/Rooms";
import { NotificationProvider } from "./modules/Notification";
import { Provider } from 'react-redux';
import { setupStore } from './store';

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
