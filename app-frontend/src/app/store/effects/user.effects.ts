import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserActionTypesEnum} from '../actions/user-action-types.enum';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IAction} from '../types';
import {IUser} from '../interfaces';
import {EMPTY} from 'rxjs';

@Injectable()
export class UserEffects {

  private readonly apiBase: string = 'https://localhost:3000/api/users';

  constructor(
    private readonly actions$: Actions,
    private readonly http$: HttpClient
  ) {
    //
  }

  public readonly getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypesEnum.getUsers),
    switchMap((action: IAction<{}>) => {
      return this.http$.get<IUser[]>(this.apiBase, action.payload).pipe(
        map((response: IUser[]) => {
          return ({
            type: UserActionTypesEnum.getUsersSuccess,
            payload: response
          });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          // todo : fix
          return EMPTY;
        })
      )
    })
  ));
}
