import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState, IAuthState, ILoginPayload} from '../interfaces';
import {selectAuthState} from '../selectors/auth.selector';
import {AuthActionTypes} from '../actions/auth_action_types.enum';

@Injectable()
export class AuthService {

  constructor(
    private readonly store$: Store<IAppState>
  ) {
    //
  }

  public readonly authState$: Observable<IAuthState> = this.store$.select(selectAuthState);

  public logIn(credentials: ILoginPayload): void {
    this.store$.dispatch({
      type: AuthActionTypes.LogIn,
      payload: credentials
    });
  }
}
