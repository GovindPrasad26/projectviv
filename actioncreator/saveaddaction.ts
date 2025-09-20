// src/redux/actions/locationActions.js
// export const setSavedAddresses = (addresses) => {
//     return {
//         type: "SET_SAVED_ADDRESSES",
//         payload: addresses,
//     };
// };

export const setSavedAddresses = (addresses: any[]) => {
  return {
    type: "SET_SAVED_ADDRESSES",
    payload: addresses,
  };
};
