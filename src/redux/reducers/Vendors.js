import { ActionTypes } from "../actionTypes/ActionTypes";

const initialState = [];

const VendorReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.GET_ALL_VENDOR:
            return payload
        default:
            return state
    }
}
export default VendorReducer