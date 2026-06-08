import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      //   return { ...state, ...action.payload };
      Object.assign(state, action.payload);
    },
  },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;

/**
 * DSA CONCEPT FOR CACHING
 *
 * Time complexity to search in an array = BIG O of n = O(n)
 *
 * Time complexity to search in an object = BIG O of 1 = O(1)
 *
 * O(1) IS BETTER OPTIMIZED THAN O(n)
 *
 * new Map() is better OPTIMIZED than O(1)
 * 
 * 
 * Ex-- 
 * 
 * state = { iphone: ["iphone 16", "iphone 17"] }
 * action.payload = { macbook: ["macbook pro", "macbook air"] }
 * return { ...state, ...action.payload };
 * means
 * return {
  macbook: ["macbook pro", "macbook air"],
  iphone: ["iphone 16", "iphone 17"]
};
***** OR 
// const myCache = { iphone: ["iphone 16"] };
const newApiData = { macbook: ["macbook pro"] };

// Copy everything from newApiData into myCache
Object.assign(myCache, newApiData);

console.log(myCache);
// Output: { iphone: ["iphone 16"], macbook: ["macbook pro"] }


 */
