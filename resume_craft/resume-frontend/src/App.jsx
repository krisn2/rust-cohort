import { Route, Routes } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ExamplePage from "./components/ExamplePage";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HelpPage from "./components/HelpPage";
import ResumeForm from "./components/ResumeFrom";
const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-max">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/examples" element={<ExamplePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/build" element={<ResumeForm />} />
      </Routes>
    </div>
  );
};

export default App;
