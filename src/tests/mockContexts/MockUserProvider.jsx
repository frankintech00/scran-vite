import { UserContext } from "../../contexts/UserContext";

const MockUserProvider = ({ children, error }) => {
  const providerValue = {
    error,
  };
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default MockUserProvider;
