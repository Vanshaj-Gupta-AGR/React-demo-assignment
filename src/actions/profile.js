
import { APIUrls } from "../helpers/url";
import { FETCH_USER_PROFILE, USER_PROFILE_FAILURE, USER_PROFILE_SUCCESS } from "./actionTypes";
import { gettoken } from "../helpers/utils";

export function userProfileSuccess(user){
    return {
        type: USER_PROFILE_SUCCESS,
        user,
    }
}
export function userProfileFailed(error){
    return {
        type: USER_PROFILE_FAILURE,
        error,
    }
}

export function startUserProfileFetch(){
    return {
        type: FETCH_USER_PROFILE
    }

}

export function fetchUserProfile(userId){
    console.log("hi")
    return (dispatch)=>{
        dispatch(startUserProfileFetch());

        const url=APIUrls.userProfile(userId);
        fetch(url,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization':  `Bearer ${gettoken()}`
              },
        })
        .then(response=>response.json())
        .then((data)=>{
            console.log(data)
            dispatch(userProfileSuccess(data.data.user));
        })
    }
}

