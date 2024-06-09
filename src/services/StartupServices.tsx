import React, {ReactNode, useEffect} from 'react';
import NetworkStatusService from './NetworkStatusService';
import FakeSentryService from './FakeSentryService';
import FakeAmplitudeService from './FakeAmplitudeService';

interface StartupServicesProps {
  children: ReactNode;
}

const StartupServices: React.FC<StartupServicesProps> = ({children}) => {
  useEffect(() => {
    // Initialize Fake Sentry service
    FakeSentryService.init();
    FakeAmplitudeService.initialize();
  }, []);
  return (
    <>
      {children}
      <NetworkStatusService />
    </>
  );
};

export default StartupServices;
