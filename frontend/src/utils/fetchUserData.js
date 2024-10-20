import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchUserData = async (userId) => {
    // get the document from users collection corresponding to userID
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    // if the user exists, then return its relevant fields
    if (userSnapshot.exists()) {
        return userSnapshot.data();
    } else {
        console.error('No such user!');
        return null;
    }
};
