const initialState = {
  text: [],
  suggest: [
    "html",
    "css",
    "javascript",
    "reactjs",
    "nodejs",
    "mongodb",
    "gIT",
    "githib",
    "jquerry",
    "expressjs",
  ],
};

const textReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "TAGS":
      return { ...state, text: [...state.text, payload] };
    case "ADD_SUG":
      return { ...state, suggest: [...state.suggest, payload] };
    case "REPLACE_TAGS":
      return { ...state, text: payload };
    default:
      return state;
  }
};

export default textReducers;
