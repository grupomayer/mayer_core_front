import { Provider } from "react-redux";
import store from "Store/store";
import PagesRoutes from "./Routes/routes";

function App() {
  return <Provider store={store}>
    <PagesRoutes />
  </Provider>;
}

export default App;
