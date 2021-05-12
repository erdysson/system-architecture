import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IRegistrationFailurePayload} from '../store/interfaces';
import {AuthService} from '../store/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.scss'
  ]
})
export class RegisterComponent implements OnDestroy {

  name = '';

  lastName = '';

  userName = '';

  password = '';

  error: IRegistrationFailurePayload|null = null;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {
    //
  }

  register(): void {
    this.error = null;
    this.authService.register({name: this.name, lastName: this.lastName, userName: this.userName, password: this.password}).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      console.log('registration is successful!');
      this.router.navigate(['/login']);
    }, (errorResponse: HttpErrorResponse) => {
      console.log('error during registration', errorResponse.error);
      this.error = errorResponse.error;
    });
  }

  clearError(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
