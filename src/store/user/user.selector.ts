import { createSelector } from 'reselect';
import { RootState } from '../store';
import { UserState } from './user.reducer';

// input selector
export const selectUserReducer = (state: RootState): UserState => state.user


// selector we use based on the input selector changing
export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
);