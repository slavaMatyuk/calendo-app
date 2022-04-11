import { AppDispatch } from '../..';
import UserService from '../../../api/UserService';
import { IUser } from '../../../models/IUser';
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
  setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const mockUser = response.data.find(user => user.username === username && user.password === password);
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('Invalid username or password'));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1500)
    } catch (e) {
      dispatch(AuthActionCreators.setError('Authentication is failed'))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setIsAuth(false));
    } catch (e) {
      dispatch(AuthActionCreators.setError('Something went wrong...'));
    }
  },
};