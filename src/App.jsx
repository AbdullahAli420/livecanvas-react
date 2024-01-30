import Board from "./Components/Board/Board";
import { store } from "./stores/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Board />
        </div>
      </Provider>
    </>
  );
}

export default App;
