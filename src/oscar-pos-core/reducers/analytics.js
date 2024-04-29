import initialState from './initialState';
import { ANALYTICS } from '../actions/types'

export var analyticsReducer = (state = initialState.analytics, action) => {
    switch (action.type) {
        case ANALYTICS.TOTAL_REVENUE:
            return { ...state, total_revenue: action.data }
        case ANALYTICS.TOTAL_COGS:
            return { ...state, total_cogs: action.data }
        case ANALYTICS.GROSS_MARGIN_VALUE:
            return { ...state, gross_margin_value: action.data }
        case ANALYTICS.GROSS_MARGIN_PERCENTAGE:
            return { ...state, gross_margin_percentage: action.data }
        case ANALYTICS.CUSTOMERS_SERVED:
            return { ...state, customers_served: action.data }
        case ANALYTICS.SALES_BY_DAY:
            return { ...state, sales_by_day: action.data }
        case ANALYTICS.SALES_BY_HOUR:
            return { ...state, sales_by_hour: action.data }
        case ANALYTICS.AVG_ITEMS_PURCHASED:
            return { ...state, avg_items_purchased: action.data }
        case ANALYTICS.AVG_ORDER_VALUE:
            return { ...state, avg_order_value: action.data }
        case ANALYTICS.PAYMENT_METHODS:
            return { ...state, payment_methods: action.data }
        case ANALYTICS.TOP_ITEMS_BY_SALES:
            return { ...state, top_items_by_sales: action.data }
        case ANALYTICS.LOWEST_ITEMS_BY_SALES:
            return { ...state, lowest_items_by_sales: action.data }

        default:
            return state;
    }
}