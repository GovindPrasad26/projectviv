
// src/redux/reducers/locationReducer.js
// const initialState = {
//     savedAddresses: [],
// };

// const locationReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "SET_SAVED_ADDRESSES":
//             return {
//                 ...state,
//                 savedAddresses: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export default locationReducer;


// src/redux/reducers/locationReducer.ts
const initialState = {
  savedAddresses: [],
};

// Mark action as 'any' to remove the red mark
const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SAVED_ADDRESSES":
      return {
        ...state,
        savedAddresses: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
