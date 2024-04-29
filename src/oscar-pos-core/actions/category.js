import { CATEGORY } from './types';
// import categoryDB from '../../db/category';
// import CategoryDB from '../../db/category';
import axios from 'axios';
import { store } from '../../store';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants';

export const getCategoryForEdit = (category) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch({
				type: CATEGORY.GET_CATEGORY_FOR_EDIT,
				data: category,
			});
			resolve();
		});
	}
};

// export const updateCategoryDukaan = (db = null, category) => {
//   return new Promise((resolve, reject) => {
//     console.log('category : ', category);
//     var t0 = Date.now();
//     CategoryDB.updateCategoryInDbDukaan(db, category).then((res) => {
//       console.log('updateCategoryInDbDukaan res : ', res, category);
//       var t1 = Date.now();
//       console.log('Time consume (Category Update)= ', (t1 - t0) / 1000, ' sec');
//       // product.product_data._rev = res.rev;
//       store.dispatch({
//         type: CATEGORY.UPDATE_CATEGORY,
//         data: {...category, _id: category._id},
//       });
//       resolve(res);
//     });
//   });
// };

// export const getAllCategoriesFromDbDukaan = (db = null) => {
//   // return (dispatch, getState) => {
//   return new Promise((resolve, reject) => {
//     var t0 = Date.now();
//     // Reactotron.log("Get products at t0 : ", t0);
//     CategoryDB.getAllCategoriesFromDbDukaan(db)
//       .then((res) => {
//         console.log('Categories from Db', JSON.parse(JSON.stringify(res)));
//         store.dispatch({
//           type: CATEGORY.GET_CATEGORIES,
//           data: JSON.parse(JSON.stringify(res)),
//         });
//         resolve(JSON.parse(JSON.stringify(res)));
//       })
//       .catch((err) => {
//         console.log('Cannot get categories from DB', err);
//         reject(err);
//       });
//   });
//   // };
// };

// export const getCategoriesByPhoneNumber = (db = null, phoneNumber) => {
//   // return (dispatch, getState) => {
//   return new Promise((resolve, reject) => {
//     var t0 = Date.now();
//     // Reactotron.log("Get products at t0 : ", t0);
//     console.log('Getting by:', phoneNumber);
//     CategoryDB.getCategoriesByPhoneNumberFromDbDukaan(db, phoneNumber)
//       .then((res) => {
//         var t1 = Date.now();
//         // Reactotron.log("Get products at t1 : ", t1);
//         // console.log('Time consume (Products Get)= ', (t1 - t0) / 1000, ' sec');
//         console.log('Categories from Db', JSON.parse(JSON.stringify(res)));
//         // getProductsDispatch(res);
//         // store.dispatch({
//         //   type: PRODUCT.GET_PRODUCTS,
//         //   data: JSON.parse(JSON.stringify(res)),
//         // });
//         resolve(JSON.parse(JSON.stringify(res)));
//       })
//       .catch((err) => {
//         console.log('Cannot get categories from DB', err);
//         reject(err);
//       });
//   });
//   // };
// };
export const checkCategoriesDukaan = (db = null) => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			// CategoryDB.checkProductsInDbDukaan(db).then((res) => {
			//   resolve(res);
			// });
		});
	};
};

// export const removeCategoryDukaanFromDB = (db = null, cat_id) => {
//   return new Promise((resolve, reject) => {
//     var t0 = Date.now();
//     CategoryDB.removeCategoryFromDbDukaan(db, cat_id)
//       .then((res) => {
//         var t1 = Date.now();
//         console.log(
//           'Time consume (Category Remove)= ',
//           (t1 - t0) / 1000,
//           ' sec',
//         );
//         store.dispatch({
//           type: CATEGORY.REMOVE_CATEGORY,
//           id: cat_id,
//         });
//         resolve(cat_id);
//       })
//       .catch((err) => {
//         console.log('err : ', err);
//         reject();
//       });
//   });
// };

export const getDukaanCategoryFromCloud = (vanity_url, BASE_URL, { pageNumber = 1, pageSize = 10 } = {}) => {
	return new Promise((resolve, reject) => {
		let url
		// if (process.env.NODE_ENV === 'development' || window.location.hostname == "sell.ubook.pk") {
		url = `${BASE_URL}api/toko/v3/merchant/${vanity_url}/categories/?page_number=${pageNumber}&page_size=${pageSize}`
		// }
		// else { 
		// url = `${BASE_URL}api/toko/v2/merchant/${vanity_url}/categories/`;
		//  }
		axios
			.get(url, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('kasjkasjd', res.data.data)
				if (res.status === 200 || res.status === 201) {
					store.dispatch({
						type: CATEGORY.GET_CATEGORIES,
						data: JSON.parse(JSON.stringify(res.data.data.results)),
					});
					resolve(JSON.parse(JSON.stringify(res.data.data)));
				} else {
					reject(
						'getDukaanCategoryFromCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('getDukaanCategoryFromCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('getDukaanCategoryFromCloud adding prodyct failed');
					reject('getDukaanCategoryFromCloud adding prodyct failed');
				} else {
					console.log('getDukaanCategoryFromCloud err : ', err);
					reject(
						'getDukaanCategoryFromCloud something went wrong:',
						err.response,
					);
				}
			});
	});
};

export const addDukaanCategoryToCloud = (category, vanity_url, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/merchant/${vanity_url}/categories/`;

		axios
			.post(url, category, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				if (res.status === 200 || res.status === 201) {
					resolve(res);
				} else {
					reject('addDukaanCategoryToCloud something went wrong');
				}
			})
			.catch((err) => {
				console.log('addDukaanCategoryToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addDukaanCategoryToCloud err');
					reject(err);
				} else {
					console.log('addDukaanCategoryToCloud err : ', err);
					reject(err);
				}
			});
	});
};

export const updateDukaanCategoryToCloud = (category, user, BASE_URL) => {
	console.log('Hello')
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/merchant/${user.vanity_url}/categories/${category._id}/`;

		let data = {
			name: category.name,
			phone_number: user.phone_number,
			activation_code: user.activation_code,
			photo: category.photo
		};

		axios
			.post(url, data, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				if (res.status === 200 || res.status === 201) {
					store.dispatch({
						type: CATEGORY.UPDATE_CATEGORY,
						data: { ...category, _id: category._id },
					});
					resolve(res);
				} else {
					reject(
						'updateDukaanCategoryToCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('updateDukaanCategoryToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('updateDukaanCategoryToCloud adding category failed');
					reject('updateDukaanCategoryToCloud adding category failed');
				} else {
					console.log('updateDukaanCategoryToCloud err : ', err);
					reject(
						'updateDukaanCategoryToCloud something went wrong:',
						err.response,
					);
				}
			});
	});
};

export const deleteDukaanCategoryToCloud = (category, user, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/merchant/${user.vanity_url}/categories/${category._id}/`;
		let data = {
			phone_number: user.phone_number,
			activation_code: user.activation_code,
		};

		var options = {
			method: 'DELETE',
			headers: {
				'Authorization': 'JWT ' + Cookies.get('token'),
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		};
		fetch(url, options)
			.then((response) => {
				if (response.status === 200 || response.status === 201) {
					return response.json();
				} else {
					reject(
						'deleteDukaanCategoryToCloud something went wrong: status code',
						response.status,
					);
				}
			})
			.then((res) => {
				resolve(JSON.parse(JSON.stringify(res)));
			})
			.catch((err) => {
				console.log('deleteDukaanCategoryToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('deleteDukaanCategoryToCloud adding prodyct failed');
					reject('deleteDukaanCategoryToCloud adding prodyct failed');
				} else {
					console.log('deleteDukaanCategoryToCloud err : ', err);
					reject(
						'deleteDukaanCategoryToCloud something went wrong:',
						err.response,
					);
				}
			});
	});
};


export const addMultipleCategories = (PARAMS, vanity_url) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			const URL = `${BASE_URL}api/toko/v2/merchant/${vanity_url}/multiplecategories/`;
			axios.post(
				URL,
				{ categories: PARAMS },
				{
					headers: {
						'Authorization': 'JWT ' + Cookies.get('token'),
						'Content-Type': 'application/json'
					}
				}
			).then(res => {
				dispatch({
					type: CATEGORY.ADD_MULTIPLE_CATEGORIES,
					data: res.data.categories,
				})
				resolve(res.data);
			}).catch(err => {
				console.log('addMultipleCategories err', err);
				reject(err.response);
			})
		})
	}
}