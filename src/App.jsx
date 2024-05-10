import Board from "./Components/Board/Board";
import Hero from "./Components/Homepage/Hero";
import Navbar from "./Components/Homepage/Navbar";
import { store } from "./stores/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Board />
          {/* <Navbar /> */}
          {/* <Hero /> */}
        </div>
      </Provider>
    </>
  );
}

export default App;
