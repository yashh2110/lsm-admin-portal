import { ActionTypes } from "../actionTypes/ActionTypes";

const initialState = [];

const AdminReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.GET_ADMIN:
            return payload
        default:
            return state
    }
}
export default AdminReducer