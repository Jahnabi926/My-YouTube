import { Link } from "react-router";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

const Header = () => {
  const {
    toggleMenuHandler,
    handleSearchSubmit,
    searchQuery,
    setSearchQuery,
    setShowSuggestions,
    showSuggestions,
    suggestions,
    handleSuggestionClick,
  } = useSearchSuggestions();

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
