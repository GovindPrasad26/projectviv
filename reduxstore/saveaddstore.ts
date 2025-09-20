// import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import locationReducer from "../reducer/savereducer";

// // Combine all reducers
// const rootReducer = combineReducers({
//   location: locationReducer,
// });

// // Middleware array (skip redux-logger for Hermes)
// const middleware = [thunk];

// // Create store
// const reduxSave = legacy_createStore(rootReducer, applyMiddleware(...middleware));

// export default reduxSave;



// import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import locationReducer from "../reducer/savereducer";

// const rootReducer = combineReducers({
//   location: locationReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// const reduxSave = legacy_createStore(rootReducer, applyMiddleware(thunk));

// export default reduxSave;

// import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import locationReducer from "../reducer/savereducer";

// // Combine all reducers
// const rootReducer = combineReducers({
//   location: locationReducer,
// });

// // Create store with middleware
// const reduxSave = legacy_createStore(rootReducer, applyMiddleware(thunk));

// export default reduxSave;


// import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import locationReducer from "../reducer/savereducer";   // adjust path
// import restaurantReducer from "@/reducer/resturantloc";// adjust path

// // Combine all reducers here
// const rootReducer = combineReducers({
//   location: locationReducer,
//   restaurant: restaurantReducer,
// });

// // Create store with thunk middleware
// const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// export default store;


import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import locationReducer from "../reducer/savereducer";
import restaurantReducer from "@/reducer/resturantloc";

// Persist config for reducers
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["location", "restaurant"], // reducers you want to persist
};

const rootReducer = combineReducers({
  location: locationReducer,
  restaurant: restaurantReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
