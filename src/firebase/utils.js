import firebase from './index';

const db = firebase.firestore();

export const addDocToCollection = async (collectionName, params) => {
    const result = await db.collection(collectionName).add(params);
    return result;
}

export const deleteDocFromCollection = (collectionName, docId) => {
    const result = db.collection(collectionName).doc(docId).delete();
    return result;
}