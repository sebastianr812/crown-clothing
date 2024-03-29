import { USER_ACTION_TYPES } from "./user.types";
import { AnyAction } from "redux";
import { signInSuccess, signInFailed, signOutFailed, signUpFailed, signOutSuccess } from './user.action'
import { UserData } from "../../utils/firebase/firebase.utils";
import { signOut } from "firebase/auth";


export type UserState = {
    readonly currentUser: null | UserData;
    readonly isLoading: boolean;
    readonly error: Error | null
}

const INITAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}


export const userReducer = (state = INITAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        };
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        };
    }

    if (
        signInFailed.match(action) ||
        signOutFailed.match(action) ||
        signUpFailed.match(action)
    ) {
        return {
            ...state,
            error: action.payload
        };
    }

    return state;



    // switch (type) {
    //     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    // return {
    //     ...state,
    //     currentUser: payload
    // };
    //     case USER_ACTION_TYPES.SIGN_IN_FAILED:
    //     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    //     case USER_ACTION_TYPES.SIGN_UP_FAILED:
    // return {
    //     ...state,
    //     error: payload
    // };
    //     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    // return {
    //     ...state,
    //     currentUser: null
    // };


    //     default:
    //         return state;
    // }
};
