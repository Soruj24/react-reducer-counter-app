import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Error from "../page/Error";
import Cart from "../page/Cart";
import Register from "../page/Register";
import Login from "../page/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path:'/login',
                element:<Login />
            }
        ]
    },
]);

export default router