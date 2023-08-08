import { UserContext } from "../contexts/UserContext";

const MockUserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default MockUserProvider;
