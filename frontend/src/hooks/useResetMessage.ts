import { resetMessage } from "../slices/userSlice";
import { resetMessage as resetMessagePhoto } from "../slices/photoSlice";
import { AppDispatch } from "../store";

export const useResetMessage = (dispatch: AppDispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
      dispatch(resetMessagePhoto());
    }, 1000);
  };
};
