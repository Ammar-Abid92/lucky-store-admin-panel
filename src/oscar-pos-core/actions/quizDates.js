import { QUIZ } from "./types";

export const setQuizStartDate = (date) => {
  return (dispatch) => {
    console.log("Quiz Starts at ", date);

    return (dispatch) => {
      dispatch({
        type: QUIZ.SET_QUIZ_START_DATE,
        payload: date,
      });
    };
  };
};

// export const setQuizEndDate = (date) => {
//   return (dispatch) => {
//     console.log("Quiz Ends at ", date);

//     dispatch({
//       type: QUIZ.SET_QUIZ_END_DATE,
//       payload: date,
//     });
//   };
// };

export const setQuizEndDate = (date) => {
  return (dispatch, getState) => {

    console.log("Quiz Ends at ", date);

    dispatch({
    //   type: QUIZ.SET_QUIZ_END_DATE,
      type: "SET_QUIZ_END_DATE",
      payload: date,
    });
  };
};
