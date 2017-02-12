import { injectDeps } from 'components-di';
import RootComponent from '../../ui/views/Example';
import actions from './actions';

class ExampleController {
  constructor(initialState, context) {
    this._context = context;
    this._context.store.resetState(initialState);
    this._view = injectDeps(this.context, this.actions)(RootComponent);
  }
  dispose() { }
  get context() {
    return this._context;
  }
  get actions() {
    return actions;
  }
  get view() {
    return this._view;
  }
};

export default ExampleController;
