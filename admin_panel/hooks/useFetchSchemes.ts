import app from '../../config/firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFetchSchemes = () => {
    const [schemes, setSchemes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchSchemes = async () => {
            const schemesCollection = collection(db, 'schemes');
            try {
                const querySnapshot = await getDocs(schemesCollection);
                const schemesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSchemes(schemesData);
            } catch (err) {
                setError('Failed to fetch schemes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemes();
    }, [db]);

    return { schemes, loading, error };
};

export default useFetchSchemes; 