import { UserContext } from "../../contexts/UserContext";

const MockUserProvider = ({ children, error, isLoggedIn, user, isOpen }) => {
  const providerValue = {
    error,
    isLoggedIn,
    user,
    isOpen,
  };
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default MockUserProvider;
