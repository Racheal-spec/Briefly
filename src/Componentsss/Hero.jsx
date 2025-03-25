import newlogo from "../assets/newlogo.png";

const Hero = () => {
  return (
    <header className="w-full">
      <nav className="flex justify-between px-10">
        <img src={newlogo} alt="logo" className="w-40" />
        <button
          className="bg-green-700 text-white px-5 rounded-2xl text-lg font-medium"
          onClick={() => window.open("https://github.com/Racheal-spec")}
        >
          Github
        </button>
      </nav>
    </header>
  );
};

export default Hero;
