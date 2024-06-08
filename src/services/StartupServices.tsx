import React, {ReactNode} from 'react';
import NetworkService from './NetworkService';

interface StartupServicesProps {
  children: ReactNode;
}

const StartupServices: React.FC<StartupServicesProps> = ({children}) => {
  return (
    <>
      {children}
      <NetworkService />
    </>
  );
};

export default StartupServices;
