import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../store/services/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public userName: string = '';

  public password: string = '';

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {
    //
  }

  public login(): void {
    this.authService.logIn({userName: this.userName, password: this.password}).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, (errorResponse: HttpErrorResponse) => {
      console.log('error while login', errorResponse.error);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
