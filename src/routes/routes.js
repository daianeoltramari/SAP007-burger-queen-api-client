import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import SignUp from "../pages/signup/signup";
import Menu from "../pages/menu/menu";
import Kitchen from "../pages/kitchen/kitchen";
import Order from "../pages/order/order";
import PrivateRoute from "./privateRoute";

const AllRoute = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/menu"
            element={
              <PrivateRoute redirectTo="/">
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path="/kitchen"
            element={
              <PrivateRoute redirectTo="/">
                <Kitchen />
              </PrivateRoute>
            }
          />
          <Route
            path="/order"
            element={
              <PrivateRoute redirectTo="/">
                <Order />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AllRoute;
