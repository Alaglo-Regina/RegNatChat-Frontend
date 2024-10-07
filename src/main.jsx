import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Authentication/Registration/Registration.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CheckOtpCode from './pages/Authentication/OtpCode/CheckOtpCode.jsx';
import Sidebar from './pages/Includes/Sidebar/Sidebar.jsx';
import Group from './pages/Includes/Group/Group.jsx';
// import addMember from '../../components/Modals/addMember.jsx';

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
  {
    path: "/group",
    element: <Group />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
  // {
  //   path: "/addMember",
  //   element: <addMember/>
  // },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)