import React, { useEffect, useState } from 'react'
import firebase from '../firebase';
const db = firebase.firestore();

const useGetCollectionData = (collectionName) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData()
    }, [collectionName])

    const fetchData = async () => {
        const collectionRef = db.collection(collectionName);
        const snapshot = await collectionRef.get();
        const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
    };

    return data;
}

export default useGetCollectionData;