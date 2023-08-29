import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { LoginPageComponent as LoginPage } from "./authPages/LoginPage/LoginPage.jsx";
import { RegisterPageComponent as RegisterPage } from "./authPages/RegisterPage/RegisterPage.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import { AlertNotificationComponent as AlertNotification } from "./shared/components/AlertNotification.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
};

export default App;
