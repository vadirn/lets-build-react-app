export default {
  toggleButton: (context) => {
    const state = context.store.state;
    context.store.setState({ isOn: !state.isOn });
  },
};
