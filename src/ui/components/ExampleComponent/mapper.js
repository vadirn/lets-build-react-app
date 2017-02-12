export default (context, actions) => ({
  isOn: context.store.state.isOn,
  toggleButton: actions.toggleButton,
});
