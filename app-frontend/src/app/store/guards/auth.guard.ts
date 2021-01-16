import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
    const isAuthenticated: boolean = this.authService.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      console.log('auth guard requires login');
      // redirect to login page
      return this.authService.requireLogin();
    }
  }
}
