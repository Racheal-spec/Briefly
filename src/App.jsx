import "./App.css";
import Demo from "./Components/Demo";
import Hero from "./Components/Hero";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient">AI Appppppp</div>
      </div>
      <div className="mt-5 font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;
