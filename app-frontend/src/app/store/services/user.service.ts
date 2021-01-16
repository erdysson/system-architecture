import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState, IUserState} from '../interfaces';
import {Observable} from 'rxjs';
import {selectUserState} from '../selectors/user.selector';
import {UserActionTypesEnum} from '../actions/user-action-types.enum';

@Injectable()
export class UserService {

  public readonly userState$: Observable<IUserState> = this.store$.select(selectUserState);

  constructor(
    private readonly store$: Store<IAppState>
  ) {
    //
  }

  public getUsers(): void {
    this.store$.dispatch({
      type: UserActionTypesEnum.getUsers,
      payload: {}
    })
  }
}
