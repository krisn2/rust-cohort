import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ResumeForm from "./components/ResumeForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-max">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/build"
          element={
            <PrivateRoute>
              <ResumeForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
