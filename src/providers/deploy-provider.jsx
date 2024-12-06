import { createContext, useContext } from "react";

const DeployContext = createContext({});

const DeployProvider = ({ children }) => {
  const createDeployment = (creator) => {
    alert(`deployment created by ${creator}`);
  };

  const contextValue = { createDeployment };

  return (
    <DeployContext.Provider value={contextValue}>
      {children}
    </DeployContext.Provider>
  );
};

export const useDeploy = () => useContext(DeployContext);

export default DeployProvider;
