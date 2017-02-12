import './assets/css/global.css';

import Session from './controllers/Session';
import controllers from './controllers';

global.session = new Session(
  document.getElementById('mount-point'),
  controllers,
);

if (window.console) {
  console.log(`Running app version ${process.env.VERSION}`);
}
