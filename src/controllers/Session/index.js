import SessionController from 'session-controller';

class Session extends SessionController {
  constructor(mountPoint, controllers) {
    super(mountPoint, controllers);

    this.setCurrentController(
      'exampleController',
      { isOn: false },
    );
  }
};

export default Session;
