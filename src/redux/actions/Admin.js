import { ActionTypes } from "../actionTypes/ActionTypes"

export const GetAdmin=(payload)=>{
    return {
        type:ActionTypes.GET_ADMIN,
        payload
    }
}