import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
