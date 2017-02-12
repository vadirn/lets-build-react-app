import { useDeps } from 'components-di';
import Component from './Component';
import mapper from './mapper';

export default useDeps(mapper)(Component);
