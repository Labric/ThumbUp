import { firestore, auth, firebase } from "../../config/FirebaseConfig";


export const GET_USERS = "GET_USERS"

// Fetch all users //
  export const getUsers = () => async dispatch => {
    try {
      const usersData = []
      await firestore.collection('Users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            usersData.push(doc.data());
        });
    });
      return dispatch({type: GET_USERS, payload: usersData})
    } catch (err) {
      console.warn("err: ", err)
      return err
    }
  }



