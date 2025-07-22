import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ResumeForm from "./components/ResumeForm";
const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-max">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/build" element={<ResumeForm />} />
      </Routes>
    </div>
  );
};

export default App;
