import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header>
      <nav className="flex justify-between">
        <img src={logo} alt="logo" />
        <button
          className="bg-black text-white px-5 py-3 rounded-3xl"
          onClick={() => window.open("https://github.com/Racheal-spec")}
        >
          Github
        </button>
      </nav>

      <h1 className="mt-5 text-5xl font-extrabold text-black sm:text-6xl text-center sm:text-6xl">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          OpenAi GPT-4
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 text-center sm:text-xl text-center max-w-2xl">
        Simplify your reading with Summize, an open source article summarizer
        that transforms lengthy articles into clear aconcise summaries.
      </p>
    </header>
  );
};

export default Hero;
