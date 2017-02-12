export default {
  exampleController: (cb) => {
    require.ensure([], (require) => {
      cb(require('./ExampleController').default);
    });
  },
};
