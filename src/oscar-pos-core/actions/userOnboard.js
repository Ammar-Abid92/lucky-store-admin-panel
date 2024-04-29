import { TOUR } from "./types";

export const enableTour = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: TOUR.ENABLE_TOUR
      });
      resolve();
    });
  };
}

export const disableTour = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: TOUR.DISABLE_TOUR
      });
      resolve();
    });
  };
}