import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from './app/store'
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
       <RouterProvider router={router} />
  </Provider>
);
