export const SET_RESTAURANTS = "SET_RESTAURANTS";

export const setRestaurants = (restaurants: any[]) => ({
  type: SET_RESTAURANTS,
  payload: restaurants,
});
//resturanrts: fetching near by resturants in user current location