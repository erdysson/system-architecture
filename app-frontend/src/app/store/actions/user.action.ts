import {createAction, props} from '@ngrx/store';
import {UserActionTypesEnum} from './user-action-types.enum';
import {IPayload} from '../types';
import {IApiError, IDeleteUserPayload, IGetUserPayload, IUser} from '../interfaces';

export const UserActions = {
  getUsers: createAction(UserActionTypesEnum.getUsers, props<IPayload<{}>>()),
  getUsersSuccess: createAction(UserActionTypesEnum.getUsersSuccess, props<IPayload<IUser[]>>()),
  getUsersFailure: createAction(UserActionTypesEnum.getUsersFailure, props<IPayload<IApiError>>()),

  getUser: createAction(UserActionTypesEnum.getUser, props<IPayload<IGetUserPayload>>()),
  getUserSuccess: createAction(UserActionTypesEnum.getUserSuccess, props<IPayload<IUser>>()),
  getUserFailure: createAction(UserActionTypesEnum.getUserFailure, props<IPayload<IApiError>>()),

  addUser: createAction(UserActionTypesEnum.addUser, props<IPayload<Omit<IUser, 'id'>>>()),
  addUserSuccess: createAction(UserActionTypesEnum.addUserSuccess, props<IPayload<IUser>>()),
  addUserFailure: createAction(UserActionTypesEnum.addUserFailure, props<IPayload<IApiError>>()),

  deleteUser: createAction(UserActionTypesEnum.deleteUser, props<IPayload<IDeleteUserPayload>>()),
  deleteUserSuccess: createAction(UserActionTypesEnum.deleteUserSuccess, props<IPayload<{}>>()),
  deleteUserFailure: createAction(UserActionTypesEnum.deleteUserFailure, props<IPayload<IApiError>>()),

  editUser: createAction(UserActionTypesEnum.editUser, props<IPayload<Omit<IUser, 'id'>>>()),
  editUserSuccess: createAction(UserActionTypesEnum.editUserSuccess, props<IPayload<IUser>>()),
  editUserFailure: createAction(UserActionTypesEnum.editUserFailure, props<IPayload<IApiError>>()),
};
