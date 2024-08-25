import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import PendingWork from "./components/PendingWork/PendingWork";
import NotFound from "./pages/NotFound";
import Exam from "./pages/Exam/Exam";
import Reducer from "./reducers/Reducer";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./containers/PrivateRoute";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { StudentProvider } from "./contexts/StudentContext";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <StudentProvider>
          <Router>
            <Routes>
              <Route index element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />}>
                  <Route index element={<PendingWork />} />
                </Route>
                <Route path="/exam" element={<Exam />} />
                <Route path="/test" element={<Reducer />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </StudentProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
