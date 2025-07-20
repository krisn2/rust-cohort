import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ExamplePage from "./components/ExamplePage";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HelpPage from "./components/HelpPage";
const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-max">
      <Header />
      <Hero/>
      <ExamplePage/>
      <AboutPage/>
      <ContactPage/>
      <HelpPage/>
    </div>
  );
};
  
export default App;
