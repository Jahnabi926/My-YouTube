import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log("API CALL : ", json);
    setSuggestions(json[1] || []);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
        // iphone: [1, 2, 3]
      }),
    );
  };

  useEffect(() => {
    console.log("KEY STROKE :" + searchQuery);

    // make an api call after every key press
    // if the difference between two successive key strokes is less than 200ms , decline the api call
    /**
     *
     * first key stroke, onChange method called and
     * component rendered, useEffect called,
     * start timer => make api call after 200 ms
     *
     * second key stroke, onChange method called and
     * state changed, component re-rendered , useEffect called again because it runs as our searchQuery changes
     * a new timer starts => makes an api call after 200 ms
     *
     * So when we do a settimeout , we need to clear that too
     *
     * Suppose we press a key before 200 ms completes,
     * then it clears / unmounts the previous setTimeout/ runs clearTimeout/ called everytime component re-renders
     * again goes through the same reconciliation process, rendering , starting a new timer etc
     * suppose 200 ms passes and there is no key stroke, then that api call is made.
     * This is the concept of DEBOUNCING
     *
     *
     * searchCache = {
     *     "iphone" : ["iphone 11", "iphone 14"]
     * }
     * searchQuery = iphone
     *
     * so searchCache[searchQuery] = ["iphone 11", "iphone 14"]
     */
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]); // if searchQuery is cached , don't make api call
      } else {
        getSearchSuggestions(); // if not cached , make api call and update my cachr by dispatching cacheResults action with the data
      }
    }, 200);

    // below is called when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Function to handle clicking on suggestion options
  const handleSuggestionClick = (suggestionText) => {
    setSearchQuery(suggestionText);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the entire page
    if (!searchQuery.trim()) return; // Don't search if the input field is blank

    setShowSuggestions(false);
    console.log("Searching data for: ", searchQuery);
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="https://www.shutterstock.com/shutterstock/videos/3964451401/thumb/1.jpg?ip=x480"
          alt="menu"
        />
        <Link to="/">
          <img
            className="h-8"
            src="https://t3.ftcdn.net/jpg/03/00/38/90/360_F_300389025_b5hgHpjDprTySl8loTqJRMipySb1rO0I.jpg"
            alt="youtube-logo"
          />
        </Link>
      </div>
      <div className="col-span-10 text-center">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="w-1/2 border border-gray-400 rounded-l-full p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />

          <button className="border border-gray-400 rounded-r-full px-5 py-2 bg-gray-100">
            🔍
          </button>
        </form>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute bg-white py-2 px-2 mt-12 ml-112 min-w-4/12 shadow-lg rounded-lg border border-gray-100">
          <ul>
            {suggestions.map((s) => (
              <li
                key={s}
                className="py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSuggestionClick(s)} // Fires before onBlur hides the container!
              >
                🔍 {s}
              </li> // onMouseDown fires before the input loses focus, making it work perfectly!
            ))}
          </ul>
        </div>
      )}

      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Header;
