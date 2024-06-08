import React, {ReactNode} from 'react';
import NetworkStatusService from './NetworkStatusService';

interface StartupServicesProps {
  children: ReactNode;
}

const StartupServices: React.FC<StartupServicesProps> = ({children}) => {
  return (
    <>
      {children}
      <NetworkStatusService />
    </>
  );
};

export default StartupServices;
