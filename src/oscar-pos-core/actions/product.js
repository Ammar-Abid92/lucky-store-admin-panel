import { PRODUCT } from './types';
// import {sortedProducts} from '../constants';
// import ProductDB from '../../db/product';
// import OrdersDB from '../../db/order';
import { store } from '../../store';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import Cookies from 'js-cookie';
// import Reactotron from 'reactotron-react-native'



//Dukaan Actions
// export const addProductDukaan = (realm, params) => {
//   return new Promise((resolve, reject) => {
//     console.log('addProductDukaan params: ', params);
//     ProductDB.createProductDukaan(realm, params)
//       .then((res) => {
//         store.dispatch({
//           type: PRODUCT.ADD_PRODUCT,
//           data: res,
//         });

//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// export const addProductsDukaan = (realm, params) => {
//   return new Promise((resolve, reject) => {
//     console.log('addProductDukaan params: ', params);
//     ProductDB.createProductsDukaan(realm, params)
//       .then((res) => {
//         store.dispatch({
//           type: PRODUCT.ADD_PRODUCTS,
//           data: res,
//         });

//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// export const updateProductDukaan = (db = null, product) => {
//   return new Promise((resolve, reject) => {
//     console.log('Product : ', product);
//     var t0 = Date.now();
//     // Reactotron.log("Update products at t0 : ", t0);
//     ProductDB.updateProductInDbDukaan(db, product).then((res) => {
//       // if (db == null) {
//       //   setUpdatedProductsInLocalStorage(product.product_data);
//       // }
//       console.log('res : ', res);
//       var t1 = Date.now();
//       // Reactotron.log("Update products at t1 : ", t1);
//       console.log('Time consume (Products Update)= ', (t1 - t0) / 1000, ' sec');
//       // product.product_data._rev = res.rev;
//       store.dispatch({
//         type: PRODUCT.UPDATE_PRODUCT,
//         data: {...product, _id: product._id},
//       });
//       resolve(res);
//     });
//   });
// };

// export const productSearchingQueryDukaan = (db = null, productName) => {
//   console.log('is product name comming there? ', productName);
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       ProductDB.productQueryDukaan(db, productName).then((res) => {
//         let newArray = sortedProducts(res);
//         console.log('response from database: ', res);
//         dispatch({
//           type: PRODUCT.SEARCHED_PRODUCT,
//           data: newArray,
//         });
//         resolve(res);
//       });
//     });
//   };
// };

// const getProductsDispatch = (res) => {
//   return (dispatch) => {
//     console.log('Dispatch', dispatch);
//     store.dispatch({
//       type: PRODUCT.GET_PRODUCTS,
//       data: JSON.parse(JSON.stringify(res)),
//     });
//   };
// };

// export const getProductsDukaan = (db = null) => {
//   // return (dispatch, getState) => {
//   return new Promise((resolve, reject) => {
//     var t0 = Date.now();
//     // Reactotron.log("Get products at t0 : ", t0);

//     ProductDB.getProductsFromDbDukaan(db).then((res) => {
//       var t1 = Date.now();
//       // Reactotron.log("Get products at t1 : ", t1);
//       // console.log('Time consume (Products Get)= ', (t1 - t0) / 1000, ' sec');
//       console.log('Products from Db', JSON.parse(JSON.stringify(res)));
//       // getProductsDispatch(res);
//       store.dispatch({
//         type: PRODUCT.GET_PRODUCTS,
//         data: JSON.parse(JSON.stringify(res)),
//       });
//       resolve(JSON.parse(JSON.stringify(res)));
//     });
//   });
//   // };
// };

// export const getProductsByPhoneNumber = (db = null, phoneNumber) => {
//   // return (dispatch, getState) => {
//   return new Promise((resolve, reject) => {
//     var t0 = Date.now();
//     // Reactotron.log("Get products at t0 : ", t0);
//     console.log('Getting by:', phoneNumber);
//     ProductDB.getProductsByPhoneNumberFromDbDukaan(db, phoneNumber).then(
//       (res) => {
//         var t1 = Date.now();
//         // Reactotron.log("Get products at t1 : ", t1);
//         // console.log('Time consume (Products Get)= ', (t1 - t0) / 1000, ' sec');
//         console.log('Products from Db', JSON.parse(JSON.stringify(res)));
//         // getProductsDispatch(res);
//         store.dispatch({
//           type: PRODUCT.GET_PRODUCTS,
//           data: JSON.parse(JSON.stringify(res)),
//         });
//         resolve(JSON.parse(JSON.stringify(res)));
//       },
//     );
//   });
//   // };
// };
// export const checkProductsDukaan = (db = null) => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       ProductDB.checkProductsInDbDukaan(db).then((res) => {
//         resolve(res);
//       });
//     });
//   };
// };

// export const changeProductActiveStatus = (realm, params, product) => {
//   return new Promise((resolve, reject) => {
//     console.log('changeProductActiveStatus params: ', params);
//     ProductDB.changeActiveStatus(realm, params)
//       .then((res) => {
//         resolve(res);
//         store.dispatch({
//           type: PRODUCT.UPDATE_PRODUCT_STATUS,
//           data: {...product, id: product.id},
//         });
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// export const removeProductDukaan = (db = null, product_id) => {
//   return new Promise((resolve, reject) => {
//     // alert('Here');
//     console.log('product_id : ', product_id);
//     var t0 = Date.now();
//     // Reactotron.log("Remove products at t0 : ", t0);
//     ProductDB.removeProductFromDbDukaan(db, product_id)
//       .then((res) => {
//         var t1 = Date.now();
//         // Reactotron.log("Remove products at t1 : ", t1);
//         console.log(
//           'Time consume (Products Remove)= ',
//           (t1 - t0) / 1000,
//           ' sec',
//         );
//         store.dispatch({
//           type: PRODUCT.REMOVE_PRODUCT,
//           id: product_id,
//         });
//         resolve(product_id);
//       })
//       .catch((err) => {
//         console.log('err : ', err);
//         reject();
//       });
//   });
// };

export const addProductToRedux = (data) => {
	return new Promise((resolve, reject) => {
		console.log('product', data);
		store.dispatch({
			type: PRODUCT.ADD_PRODUCT,
			data,
		})
		resolve(data)
	})
}

export const UpdateProductToRedux = (data) => {
	return new Promise((resolve, reject) => {
		console.log('product', data);
		store.dispatch({
			type: PRODUCT.UPDATE_PRODUCT,
			data,
		})
		resolve(data)
	})
}

export const getProductForEdit = (product) => {
	return new Promise((resolve, reject) => {
		console.log('getProductForEdit', product);
		store.dispatch({
			type: PRODUCT.GET_PRODUCT_FOR_EDIT,
			data: product,
		});
		resolve();
	});
};

export const getDukaanProductFromCloud = (vanity_url, BASE_URL, { pageNumber = 1, pageSize = 10 }) => {
	console.log('Base Url', BASE_URL)
	return new Promise((resolve, reject) => {

		let url = `${BASE_URL}api/toko/v3/merchant/${vanity_url}/products/?page_number=${pageNumber}&page_size=${pageSize}`;



		console.log('Url', url);

		axios
			.get(url, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log(res.data.data.results)

				if (res.status === 200 || res.status === 201) {
					console.log(
						'Dispatch GET PRODUCTS',
						JSON.parse(JSON.stringify(res.data.data.results)),
					);
					store.dispatch({
						type: PRODUCT.GET_PRODUCTS,
						data: JSON.parse(JSON.stringify(res.data.data.results)),
					});
					resolve(res);
					// resolve(JSON.parse(res.data));
				} else {
					reject(
						'getDukaanProductFromCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('getDukaanProductFromCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('getDukaanProductFromCloud adding prodyct failed');
					reject('getDukaanProductFromCloud adding prodyct failed');
				} else {
					console.log('getDukaanProductFromCloud err : ', err);
					reject(
						'getDukaanProductFromCloud something went wrong:',
						err.response,
					);
				}
			});
	});
};

export const addDukaanProductToCloud = (product, vanity_url, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/merchant/${vanity_url}/products/`;

		console.log('Url', url, 'params for updateDukaanUserToCloud', product);

		axios
			.post(url, product, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('addDukaanProductToCloud res : ', res.data);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res.data);
				} else {
					reject(
						'addDukaanProductToCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('addDukaanProductToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addDukaanProductToCloud adding prodyct failed');
					reject('addDukaanProductToCloud adding prodyct failed');
				} else {
					console.log('addDukaanProductToCloud err : ', err);
					reject('addDukaanProductToCloud something went wrong:', err.response);
				}
			});
	});
};

export const addBulkProductsFromCSV = (product, vanity_url, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/uploadcsv/`;

		console.log('Url', url, 'params for addBulkProductsFromCSV', product);

		axios
			.post(url, product, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('addBulkProductsFromCSV res : ', res.data);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res.data);
				} else {
					reject(
						'addBulkProductsFromCSV something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('addBulkProductsFromCSV error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addBulkProductsFromCSV adding prodyct failed');
					reject('addBulkProductsFromCSV adding prodyct failed');
				} else {
					console.log('addBulkProductsFromCSV err : ', err);
					reject('addBulkProductsFromCSV something went wrong::', err.response);
				}
			});
	});
};

export const addDukaanProductsToCloud = (product, vanity_url) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/merchant/${vanity_url}/uploadmultipleproducts/`;

		console.log('Url', url, 'params for updateDukaanUserToCloud', product);

		axios
			.post(url, product, {
				headers: {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('addDukaanProductsToCloud res : ', res.data);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res.data);
				} else {
					reject(
						'addDukaanProductsToCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('addDukaanProductsToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addDukaanProductsToCloud adding prodyct failed');
					reject('addDukaanProductsToCloud adding prodyct failed');
				} else {
					console.log('addDukaanProductsToCloud err : ', err);
					reject('addDukaanProductsToCloud something went wrong:', err.response);
				}
			});
	});
};

export const addImageForProduct = (product, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/uploadimage/`;

		axios
			.post(url, product, {
				'headers': {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('addImageForProduct res : ', res.data);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res.data);
				} else {
					reject(
						'addImageForProduct something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('addImageForProduct error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addImageForProduct adding prodyct failed');
					reject('addImageForProduct adding prodyct failed');
				} else {
					console.log('addImageForProduct err : ', err);
					reject('addImageForProduct something went wrong:', err.response);
				}
			});
	});
};


export const addImages = (product, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/uploadmultipleimages/`;

		console.log('Url', url, 'params for addImageForProduct', product);

		axios
			.post(url, product)
			.then((res) => {
				console.log('addImageForProduct res : ', res.data);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res.data);
				} else {
					reject(
						'addImageForProduct something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('addImageForProduct error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addImageForProduct adding prodyct failed');
					reject('addImageForProduct adding prodyct failed');
				} else {
					console.log('addImageForProduct err : ', err);
					reject('addImageForProduct something went wrong:', err.response);
				}
			});
	});
};

export const updateDukaanProductToCloud = (product, user, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let id = product._id ? product._id : product.id;
		let url = `${BASE_URL}api/toko/v2/merchant/${user.vanity_url}/products/${id}/`;
		let data = {
			name: product.name,
			price: product.price,
			description: product.description,
			variants: product.variants,
			categories: product.categories,
			photo: product.photo,
			isActive: product.isActive,
			perUnit: product.perUnit,
			phone_number: user.phone_number,
			activation_code: user.activation_code,
			costPrice: product.costPrice,
			continue_without_stock: product.continue_without_stock,
			stockable: product.stockable,
			stock: product.stock,
			discountPrice: product.discountPrice
		};

		console.log('Url', url, 'params for updateDukaanProductToCloud', product);
		axios
			.post(url, data, {
				'headers': {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('updateDukaanProductToCloud res : ', res);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res);
				} else {
					reject(
						'updateDukaanProductToCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('updateDukaanProductToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('updateDukaanProductToCloud adding prodyct failed');
					reject('updateDukaanProductToCloud adding prodyct failed');
				} else {
					console.log('updateDukaanProductToCloud err : ', err);
					reject(
						'updateDukaanProductToCloud something went wrong:',
						err.response,
					);
				}
			});
	});
};

export const deleteDukaanProductToCloud = (product, user, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/v2/merchant/${user.vanity_url}/products/${product._id}/`;

		let data = {
			phone_number: user.phone_number,
		};

		console.log(
			'Url',
			url,
			'params for deleteDukaanProductToCloud',
			data,
			'product',
			product,
			'Data in json',
			JSON.stringify(data),
		);

		var options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'JWT ' + Cookies.get('token'),
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		};
		fetch(url, options)
			.then((response) => {
				console.log('DELETE RESPONSE', response.status);
				// if (!response.ok)
				//   reject(
				//     'deleteDukaanProductToCloud something went wrong: status code',
				//     response,
				//   );
				// else
				if (response.status === 200 || response.status === 201) {
					return response.json();
				} else {
					reject(
						'deleteDukaanProductToCloud something went wrong: status code',
						response.status,
					);
				}
			})
			.then((res) => {
				console.log('deleteDukaanProductToCloud res : ', res);

				resolve(JSON.parse(JSON.stringify(res)));
			})
			.catch((err) => {
				console.log('deleteDukaanProductToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('deleteDukaanProductToCloud adding prodyct failed');
					reject('deleteDukaanProductToCloud adding prodyct failed');
				} else {
					console.log('deleteDukaanProductToCloud err : ', err);
					reject(
						'deleteDukaanProductToCloud something went wrong:',
						err.response,
					);
				}
			});

		// axios
		//   .delete(url, {

		//     headers: {
		//       'X-Requested-With': 'XMLHttpRequest',
		//       'Content-Type': 'application/json',
		//       Accept: 'application/json',
		//     },
		//     data: JSON.stringify(data),
		//   })
		//   .then((res) => {
		//     console.log('deleteDukaanProductToCloud res : ', res);
		//     // resolve(res)
		//     if (res.status === 200 || res.status === 201) {
		//       resolve(res);
		//     } else {
		//       reject(
		//         'deleteDukaanProductToCloud something went wrong: status code',
		//         res.status,
		//       );
		//     }
		//   })
		//   .catch((err) => {
		//     console.log('deleteDukaanProductToCloud error : ', err);
		//     if (err.response && err.response.status === 400) {
		//       console.log('deleteDukaanProductToCloud adding prodyct failed');
		//       reject('deleteDukaanProductToCloud adding prodyct failed');
		//     } else {
		//       console.log('deleteDukaanProductToCloud err : ', err);
		//       reject(
		//         'deleteDukaanProductToCloud something went wrong:',
		//         err.response,
		//       );
		//     }
		//   });
	});
};

export const updateDukaanProductStatusToCloud = (
	product,
	params,
	user,
	BASE_URL,
) => {

	return new Promise((resolve, reject) => {
		let id = product._id ? product._id : product.id;
		let url = `${BASE_URL}api/toko/v2/merchant/${user.vanity_url}/products/${id}/`;
		let data = {
			name: product.name,
			price: product.price,
			description: product.description,
			variants: product.variants,
			categories: product.categories,
			photo: product.photo,
			isActive: params.isActive,
			perUnit: product.perUnit,
			phone_number: user.phone_number,
			activation_code: user.activation_code,
			costPrice: product.costPrice,
		};

		console.log("PARAMS", params)
		console.log("product", product)
		console.log("user", user)
		console.log("data", data)
		console.log("token", Cookies.get('token'))

		axios
			.post(url, data, {
				'headers': {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('updateDukaanProductStatusToCloud res : ', res);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res);
				} else {
					reject(
						'updateDukaanProductStatusToCloud something went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('updateDukaanProductStatusToCloud error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('updateDukaanProductStatusToCloud adding prodyct failed');
					reject('updateDukaanProductStatusToCloud adding prodyct failed');
				} else {
					console.log('updateDukaanProductStatusToCloud err : ', err);
					reject(
						'updateDukaanProductStatusToCloud something went wrong:',
						err.response,
					);
				}
			});
	});
};

export const addProductFromCatalog = (params, vanityURL) => {
	const URL = `${BASE_URL}api/toko/add/catalog/products/`;
	console.log("addProductFromCatalog params", Cookies.get('token'))
	return new Promise((resolve, reject) => {
		axios.post(URL, params, {
			'headers': {
				'Authorization': 'JWT ' + Cookies.get('token'),
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			getDukaanProductFromCloud(vanityURL, BASE_URL, {}).then(res => {
				resolve(res);
			}).catch(err => {
			})
		}).catch((e) => {
			reject(e);
		})
	})
}