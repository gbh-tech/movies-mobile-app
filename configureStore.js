import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import Reducers from "./reducers";
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, Reducers);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
