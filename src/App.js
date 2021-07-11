import "./App.css";
import Tags from "./Components/Tags";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Tags />
      </Provider>
    </div>
  );
}

export default App;
