import { useSearchParams } from "react-router";

const searchResults = () => {
  // This extracts parameters straight from the browser URL address bar string
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Navigated Successfully! 🚀</h1>
      <p className="text-gray-600 mt-2">
        You searched for keyword:{" "}
        <span className="text-red-500 font-semibold">"{query}"</span>
      </p>
    </div>
  );
};

export default searchResults;
