import firebase from './index';

const db = firebase.firestore();

export const addDataToCollection = async (collectionName, params) => {
    const result = await db.collection(collectionName).add(params);
    return result;
}