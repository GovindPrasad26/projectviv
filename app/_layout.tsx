

// _layout.tsx


// import React from "react";
// import { Slot } from "expo-router";
// import Toast from "react-native-toast-message";
// import { CartProvider } from "../context/CartContext";
// import { AuthProvider } from "../context/Auth";
// import { LocationProvider } from "@/context/locationContent";
// import { Provider } from "react-redux";
// import reduxSave from "../reduxstore/saveaddstore";


// export default function RootLayout() {
//   return (
//     <Provider store={reduxSave}>
//       <AuthProvider>
//         <LocationProvider>
//           <CartProvider>
//             <Slot />
//             <Toast />
//           </CartProvider>
//         </LocationProvider>
//       </AuthProvider>
//     </Provider>
//   );
// }

import React from "react";
import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/Auth";
import { LocationProvider } from "@/context/locationContent";
import { Provider } from "react-redux";
import { store, persistor } from "../reduxstore/saveaddstore"; // updated store
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              <Slot />
              <Toast />
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
