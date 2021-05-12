import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  canActivate(): Promise<boolean>|boolean {
    const isAuthenticated: boolean = this.authService.isAuthenticated();
    if (isAuthenticated) {
      // redirect to landing page
      return this.router.navigate(['/']);
    } else {
      return true;
    }
  }
}
