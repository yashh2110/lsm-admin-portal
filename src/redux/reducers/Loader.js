const initial = false;
const LoaderReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case 'SET_LOADER':
      return payload;
    default:
      return state;
  }
};
export default LoaderReducer;
