import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Authentication/Registration/Registration.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CheckOtpCode from './pages/Authentication/OtpCode/checkOtpCode.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/otp-code/:email/",
    element: <CheckOtpCode/>,
  },

  {
    path: "/registration",
    element: <Registration />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)