import { createContext, useContext, useState } from "react";

// const UserContext = createContext([]);
// export default UserContext;
const UserContext = createContext();
const SearchContext = createContext([]);

export const UserProvider = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <UserContext.Provider value={[data, setData]}>
      {children}
    </UserContext.Provider>
  );
};

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// useToggleContext will be used to use and update state accross the app
// we can access to data and setData using this method
// anywhere in any component that's inside ToggleProvider
export const useUserContext = () => useContext(UserContext);
export const useSearchContext = () => useContext(SearchContext);
