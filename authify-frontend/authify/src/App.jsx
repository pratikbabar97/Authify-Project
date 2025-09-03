import { ToastContainer } from "react-toastify";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { EmailVerify } from "./pages/EmailVerify";
import { ResetPassword } from "./pages/ResetPassword";

export const App = () => {
  const thisRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
       path: "/login",
      element:<Login></Login>
    },
    {
       path: "/email-verify",
      element: <EmailVerify></EmailVerify>
    },
    {
      path: "/reset-password",
      element: <ResetPassword></ResetPassword>
    },
   
  ]);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <RouterProvider router={thisRouter}></RouterProvider>
    </div>
  );
};

export default App;
