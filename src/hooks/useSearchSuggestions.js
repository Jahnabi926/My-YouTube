import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const useSearchSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    // ⭐ This line immediately sends the user to the results page for that clicked word!
    navigate("/results?search_query=" + encodeURIComponent(suggestionText));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the entire page
    if (!searchQuery.trim()) return; // Don't search if the input field is blank

    setShowSuggestions(false);
    console.log("Searching data for: ", searchQuery);
    // ⭐ This line changes your browser page path to the results route!
    navigate("/results?search_query=" + encodeURIComponent(searchQuery));
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return {
    toggleMenuHandler,
    handleSearchSubmit,
    searchQuery,
    setSearchQuery,
    setShowSuggestions,
    showSuggestions,
    suggestions,
    handleSuggestionClick,
  };
};

export default useSearchSuggestions;
