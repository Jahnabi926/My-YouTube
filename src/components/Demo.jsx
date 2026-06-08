import { useState } from "react";

const Demo = () => {
  const [text, setText] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  console.log("Rendering...with every keyword");
  return (
    <div
      className={
        "w-96 h-96 p-2 m-4 border border-black" +
        (isDarkTheme && " bg-gray-900 text-white")
      }
    >
      <div>
        <button
          className="m-10 p-2 bg-green-200"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          Toggle
        </button>
      </div>
      <div>
        <input
          className="border border-black w-76 px-2"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Demo;

// The useMemo Hook is a built-in React tool that caches the calculated result of a
// function(heavy) between component re-renders to optimize performance.
// It forces React to skip an expensive computation and reuse the last stored
// result unless its specific dependencies change

// useCallback is a built-in React Hook that caches (memoizes) a function definition
//  between component re-renders.
// By preserving the function's memory reference, it prevents React from completely
//  rebuilding that function from scratch every time the component renders.

// The useRef Hook is a built-in React function that lets you persist values between
// renders and directly access DOM elements without triggering a component re-render
// when the value changes
