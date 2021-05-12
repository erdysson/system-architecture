import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../store/services/auth.service';
import {UserService} from '../store/services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    //
  }

  logout(): void {
    this.authService.logOut().pipe(
      first()
    ).subscribe(() => {
      this.router.navigate(['/login']);
    }, (e) => {
      console.log('error during logout', e);
    });
  }
}
