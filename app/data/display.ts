import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";
// const { persistAtom } = recoilPersist();
export const displayAtom = atom({
  key: "displayState",
  default: "grid",
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
