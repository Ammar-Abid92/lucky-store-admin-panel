import initialState from './initialState';
import {ANALYTICS_MERCHANT} from '../actions/types';

export var analyticsMerchantReducer = (
  state = initialState.analyticsHome,
  action,
) => {
  switch (action.type) {
    case ANALYTICS_MERCHANT.GET_ANALYTICS_COUNTER:
      console.log(
        'Reducer analyticsMerchantReducer ',
        action,
        'prevState',
        state,
      );
      return {
        ...action.data,
      };

    default:
      return state;
  }
};
