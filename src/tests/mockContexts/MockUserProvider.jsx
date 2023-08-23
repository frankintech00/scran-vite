import { UserContext } from "../../contexts/UserContext";

const MockUserProvider = ({
  children,
  error,
  isLoggedIn,
  user,
  isOpen,
  addUserFavourites,
  isRecipeFavourited,
}) => {
  const providerValue = {
    error,
    isLoggedIn,
    user,
    isOpen,
    addUserFavourites,
    isRecipeFavourited,
  };
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default MockUserProvider;
