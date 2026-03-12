import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./app/router";

function App() {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
