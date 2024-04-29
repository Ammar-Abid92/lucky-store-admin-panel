import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  userReducer,
  productReducer,
  selectedProductReducer,
  selectedCategoryReducer,
  dukaanCategories,
  contactListReducer,
  orderReducer,
  analyticsMerchantReducer,
  orderDetailReducer,
} from '../oscar-pos-core/reducers';

const reducers = combineReducers({
  user: userReducer,
  products: productReducer,
  selectedProduct: selectedProductReducer,
  selectedCategory: selectedCategoryReducer,
  categories: dukaanCategories,
  contacts: contactListReducer,
  orders: orderReducer,
  orderDetail: orderDetailReducer,
  analyticsHome: analyticsMerchantReducer,
});

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, applyMiddleware(thunk));

export {store};
