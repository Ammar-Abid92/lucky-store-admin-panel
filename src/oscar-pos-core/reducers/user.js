import initialState from './initialState';
import {USER} from '../actions/types';

export var userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case USER.GET_USER:
      return action.data;
    case USER.UPDATE_USER:
      console.log('action', action, 'state', state);
      return action.data;
    case USER.REMOVE_USERNAME:
      return {};
    default:
      return state;
  }
};

// export const userOnboardReducer = (state = initialState.user_onboard, action) => {
//   switch (action.type) {
//     case USER.RENDER_HOME_FIRST:
//       return action.data;
//     case USER.RENDER_HOME_SECOND:
//       return action.data;
//     case USER.RENDER_HOME_FINAL:
//       return null;
//     default:
//       return state;
//   }
// };
