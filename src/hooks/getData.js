import { useEffect, useState } from 'react'
import firebase from '../firebase';
const db = firebase.firestore();

const useGetCollectionData = (collectionName) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const collectionPromise = db.collection(collectionName).get();
                const [snapshot] = await Promise.all([collectionPromise]);
                const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setData(results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOrders();
    }, []);

    return data;
}

export default useGetCollectionData;