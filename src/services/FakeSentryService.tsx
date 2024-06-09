import React from 'react';
//Fake Service generated with ChatGPT, only for app structure illustration purposes
//TSX File because of fake Wrap function
class FakeSentryService {
  private static DEFAULT_FAKE_DSN =
    'https://examplePublicKey@o0.ingest.sentry.io/0';
  private static dsn: string = FakeSentryService.DEFAULT_FAKE_DSN;

  static wrap(Component: React.ComponentType<any>) {
    return (props: any) => {
      return <Component {...props} />;
    };
  }

  static init(dsn: string = FakeSentryService.DEFAULT_FAKE_DSN) {
    FakeSentryService.dsn = dsn;
    console.log(`Sentry initialized with DSN: ${FakeSentryService.dsn}`);
    // This is where you would normally initialize Sentry with the given DSN
  }

  static captureException(error: Error) {
    console.log(`Captured exception: ${error.message}`);
    // This is where you would normally send the error to Sentry
  }

  static captureMessage(message: string) {
    console.log(`Captured message: ${message}`);
    // This is where you would normally send the message to Sentry
  }

  static configureScope(callback: (scope: any) => void) {
    console.log('Configuring Sentry scope');
    const scope = {}; // Mock scope object
    callback(scope);
    // This is where you would normally configure the Sentry scope
  }

  static setUserContext(user: {id: string; email: string}) {
    console.log(`Set user context: ${JSON.stringify(user)}`);
    // This is where you would normally set the user context in Sentry
  }

  static addBreadcrumb(breadcrumb: {message: string; category: string}) {
    console.log(`Added breadcrumb: ${JSON.stringify(breadcrumb)}`);
    // This is where you would normally add a breadcrumb in Sentry
  }
}
export default FakeSentryService;
