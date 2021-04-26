import { firestore, auth } from "../../config/FirebaseConfig";



export const GET_TRAVELS = "GET_TRAVELS"

export const getTravels = () => async dispatch => {
    try {
      const travelData = []
      await firestore.collection('Travel').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            travelData.push(doc.data());
        });
    });
      return dispatch({type: GET_TRAVELS, payload: travelData})
    } catch (err) {
      console.warn("err: ", err)
      return err
    }
  }

 