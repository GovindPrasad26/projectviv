// import { SET_RESTAURANTS } from "@/actioncreator/resturntlocation";

// const initialState = {
//   restaurants: [],
// };

// const restaurantReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case SET_RESTAURANTS:
//       return { ...state, restaurants: action.payload };
//     default:
//       return state;
//   }
// };

// export default restaurantReducer;
//resturanrts: fetching near by resturants in user current location


import { SET_RESTAURANTS } from "@/actioncreator/resturntlocation";

export const SET_SELECTED_RESTAURANT = "SET_SELECTED_RESTAURANT";

const initialState = {
  restaurants: [],
  selectedRestaurantId: null,
};

const restaurantReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case SET_SELECTED_RESTAURANT:
      return {
        ...state,
        selectedRestaurantId: action.payload,
      };
    default:
      return state;
  }
};

export default restaurantReducer;

export const setSelectedRestaurant = (id: number) => ({
  type: SET_SELECTED_RESTAURANT,
  payload: id,
});

