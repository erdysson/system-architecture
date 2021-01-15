import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActionTypes} from '../actions/auth_action_types.enum';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {IAction} from '../types';
import {ILoginPayload, ILoginSuccessPayload} from '../interfaces';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from '../services/local-storage.service';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

  private readonly apiBase: string = 'http://localhost:3000/auth';

  constructor(
    private readonly actions$: Actions,
    private readonly http$: HttpClient,
    private readonly LocalStorageService: LocalStorageService
  ) {
    //
  }

  public readonly logIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LogIn),
    switchMap((action: IAction<ILoginPayload>) => {
      return this.http$.post<ILoginSuccessPayload>(this.apiBase + '/login', action.payload).pipe(
        tap((response: ILoginSuccessPayload) => {
          this.LocalStorageService.writeTokens(response);
        }),
        map((response: ILoginSuccessPayload) => {
          return ({
            type: AuthActionTypes.LogInSuccess,
            payload: response
          });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of({
            type: AuthActionTypes.LogInFailure,
            payload: errorResponse.error
          })
        })
      )
    })
  ));
}
