import app from '../../config/firebaseConfig';


import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(app);

const useUploadSchemes = async (schemes: any[]) => {
    const schemesCollection = collection(db, 'schemes');

    try {
        for (const scheme of schemes) {
            await addDoc(schemesCollection, {
                Title: scheme.Title,
                Description: scheme.Description,
                TableData: scheme.TableData,
            });
        }
        console.log('Schemes uploaded successfully');
    } catch (error) {
        console.error('Error uploading schemes: ', error);
    }
};

export default useUploadSchemes; 