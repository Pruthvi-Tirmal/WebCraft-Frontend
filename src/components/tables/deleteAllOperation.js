import { deleteUser } from "firebase/auth"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { deleteAboutSection, deleteDomain, deleteGallerySection, deleteHomeSection, deletePaymentSection, deleteProductsSection, deleteTracker } from "../../api/userAPI"
import { db } from "../../firebase"

// const getDeleteUser = async (id) => {
//     try {
//         await deleteDoc(doc(db, "registeredUsers", id))
//         await deleteUser(id);
//     } catch (err) {
//         console.log(err);
//     }
// }

export const deleteAllSpecSection = async (user) => {
    try {
        const res = window.confirm("Really Want To Delete?")
        //delete from firebase

        if (res) {
            // const querySnapshot = await getDocs(collection(db, "registeredUsers"))
            // querySnapshot.forEach((doc) => {
            //     if (user === doc.data().user) {
            //         getDeleteUser(doc.id);
            //     }
            // })
            deleteAboutSection(user)
            deleteDomain(user)
            deleteHomeSection(user)
            deleteGallerySection(user)
            deletePaymentSection(user)
            deleteTracker(user)
            deleteProductsSection(user)

            setTimeout(window.location.reload(), 5000); // to reload
        }
    } catch (err) {
        console.log(err);
    }

}