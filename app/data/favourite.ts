import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";
// const { persistAtom } = recoilPersist();
export const favouriteAtom = atom({
  key: "favouriteState",
  default: [] as { strMeal: string; strMealThumb: string; idMeal: number }[],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
