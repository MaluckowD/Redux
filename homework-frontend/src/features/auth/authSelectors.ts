import { RootState } from '../../app/store';

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
