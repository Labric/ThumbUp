import { GET_TRAVELS } from "../Actions/travelAction";

const initialState = {}

export default function travelReducer(state = initialState, action) {
    switch(action.type) {
        case GET_TRAVELS:
            return action.payload
        default: 
        return state
    }
}