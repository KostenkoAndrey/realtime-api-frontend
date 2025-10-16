import { RootState } from '../store';

export const selectorAuthUser = (state: RootState) => state.auth.user;
export const selectorIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
