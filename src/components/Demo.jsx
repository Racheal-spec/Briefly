import { useState, useEffect } from "react";
import linkimg from "../assets/link.svg";
import { useLazyGetSummaryQuery } from "../services/article";
import copy from "../assets/copy.svg";
import loader from "../assets/loader.svg";
import tick from "../assets/tick.svg";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = "";

  useEffect(() => {
    const localstorageArticle = JSON.parse(localStorage.getItem("articles"));

    if (localstorageArticle) {
      setAllArticles(localstorageArticle);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article?.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedallArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedallArticles);

      console.log(newArticle);
      localStorage.setItem("articles", JSON.stringify(updatedallArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <section className="mt-16 w-full flex items-center justify-center flex-col">
      <h1 className="mt-10 text-5xl font-extrabold text-black sm:text-6xl text-center sm:text-6xl">
        Summarize Any Article <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-teal-500 via-green-600 to-lime-500 bg-clip-text text-transparent">
          in Seconds
        </span>
      </h1>
      <p className="mt-10 text-bas font-medium text-gray-600 text-center flex items-center justify-center sm:text-xl max-w-3xl">
        Tired of reading long articles? Drop the link or text and get a clear,
        concise summary. It's perfect for students, researchers, and busy
        professionals.
      </p>
      <div className="flex flex-col w-full max-w-2xl pt-10 gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkimg}
            alt="linkicon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => {
              setArticle({
                ...article,
                url: e.target.value,
              });
            }}
            required
            className="peer items-center block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="peer-focus:border-gray-700 peer-focus:text-gray-700 hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400"
          >
            ↲
          </button>
        </form>
        {/******Browse URL History*******/}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer"
            >
              <div
                onClick={() => handleCopy(item.url)}
                className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/******Display Results*******/}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <>
            <p className="font-inter font-bold text-black text-center">
              You have an error
            </p>
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data.error}
            </span>
          </>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl">Article Summary</h2>
              <div className="p-10 mx-30 my-5 text-sm font-normal rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
