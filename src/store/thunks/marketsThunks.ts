import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { mockMarkets } from "../mockGlobalData";
import { setMarkets } from "../reducers/marketsReducers";
import { RootState } from "../store";
import { Markets } from "../types";

export const getMarkets = (
  id: string
): ThunkAction<
  Promise<{ markets: Array<Markets> }>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const response = mockMarkets;
    dispatch(setMarkets(response));
    return { markets: response };
  } catch (error) {
    throw error;
  }
};
