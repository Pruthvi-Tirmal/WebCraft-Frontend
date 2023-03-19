// add the doc
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'

export const storeInDB = async (user) => {
    try {
        await setDoc(doc(db, "registeredUsers", user.uid), {
            user: user.email,
            isEmailVerified: user.emailVerified,
            created: serverTimestamp()
        })
    } catch (error) {
        console.log(error);
    }
}

// find whether the user is present or not
export const findUserInDb = async (user) => {
    try {
        const docRef = doc(db, "registeredUsers", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Data is present " + docSnap.data());
            return true;
        } else {
            console.log("No such document")
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

// get all the user from firestore

export const getUsers = async () => {
    try {
        const qs = await getDocs(collection(db, "registeredUsers"));
        return qs;
        // qs.forEach((doc) => {
        //     console.log(doc.id, "=>", doc.data());
        // })
    } catch (err) {
        console.log(err);
    }
}

