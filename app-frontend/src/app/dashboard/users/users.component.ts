import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {IUser, IUserState} from '../../store/interfaces';
import {UserService} from '../../store/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss'
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly userService: UserService,
  ) {}

  public readonly users$: Observable<IUser[]> = this.userService.userState$.pipe(
    takeUntil(this.destroy$),
    map((userState: IUserState) => {
      return userState.ids.map((id: string) => userState.users[id]);
    })
  );

  ngOnInit(): void {
    this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
