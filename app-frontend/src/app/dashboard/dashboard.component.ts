import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser, IUserState} from '../store/interfaces';
import {UserService} from '../store/services/user.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public readonly users$: Observable<IUser[]> = this.userService.userState$.pipe(
    map((userState: IUserState) => {
      return userState.ids.map((id: string) => userState.users[id]);
    })
  );

  constructor(
    private readonly userService: UserService
  ) {
    //
  }

  ngOnInit() {
    console.log('dashboard on init');
    this.userService.getUsers();
  }
}
