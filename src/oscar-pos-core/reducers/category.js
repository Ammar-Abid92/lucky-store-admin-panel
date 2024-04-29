import initialState from './initialState';
import {CATEGORY} from '../actions/types';

// export var mainCategories = (state = initialState.categories, action) => {
//   switch (action.type) {
//     case CATEGORY.GET_CATEGORIES:
//       return {...state, mainCategories: [...action.data]};

//     case CATEGORY.GET_SUB_CATEGORY:
//       return {...state, subCategories: [...action.data], products: []};

//     case CATEGORY.GET_CATEGORIZED_PRODUCT:
//       return {...state, products: [...action.data], getProductFlag: true};

//     case CATEGORY.RESET_GET_CATEGORIZED_PRODUCT:
//       return {...state, getProductFlag: false};
//     default:
//       return state;
//   }
// };

export var dukaanCategories = (
  state = initialState.dukaanCategories,
  action,
) => {
  switch (action.type) {
    case CATEGORY.ADD_CATEGORY:
      console.log('Add Categories', state.mainCategories, action.data);
      return {...state, mainCategories: [...state.mainCategories, action.data]};
    case CATEGORY.ADD_MULTIPLE_CATEGORIES:
      return {...state, mainCategories: [...state.mainCategories, [...action.data]]}
    case CATEGORY.GET_CATEGORIES:
      return {...state, mainCategories: [...action.data]};

    case CATEGORY.GET_CATEGORIZED_PRODUCT:
      return {...state, products: [...action.data], getProductFlag: true};

    case CATEGORY.RESET_GET_CATEGORIZED_PRODUCT:
      return {...state, getProductFlag: false};

    case CATEGORY.UPDATE_CATEGORY:
      let categories = state;
      let categoryIndex = categories.mainCategories
        .map((item) => {
          return item._id;
        })
        .indexOf(action.data._id);
      let updatedCategory = action.data;
      // console.log('categoryIndex : ', categoryIndex)
      console.log(
        'action.data : ',
        action.data,
        'CategoriesState',
        categories,
        'categories[categoryIndex]',
        categories[categoryIndex],
      );

      categories.mainCategories[categoryIndex] = updatedCategory;
      console.log('state update categories', [...categories.mainCategories]);

      let newcats = Object.assign({}, categories);
      newcats.mainCategories = [...categories.mainCategories];
      console.log(
        'STATE CATEGORIES ACTUAL',
        categories,
        'Update Categories state',
        newcats,
      );
      return {...categories, mainCategories: [...categories.mainCategories]};

    case CATEGORY.REMOVE_CATEGORY:
      let tempCategories = [...state.mainCategories];

      console.log('tempCategories: ', tempCategories, action);
      let newTempCategories = tempCategories.filter(
        (item) => item._id !== action.id,
      );
      console.log('tempCategories new: ', newTempCategories);
      let newCategory = {...state, mainCategories: newTempCategories};

      return newCategory;

    default:
      return state;
  }
};

export var selectedCategoryReducer = (
  state = initialState.selectedCategory,
  action,
) => {
  switch (action.type) {
    case CATEGORY.GET_CATEGORY_FOR_EDIT:
      return action.data;

    default:
      return state;
  }
};
