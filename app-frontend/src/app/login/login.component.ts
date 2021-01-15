import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../store/services/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {IAuthState} from '../store/interfaces';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public userName: string = '';

  public password: string = '';

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private readonly AuthService: AuthService
  ) {
    //
  }

  public login(): void {
    this.AuthService.logIn({userName: this.userName, password: this.password})
  }

  ngOnInit() {
    this.AuthService.authState$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((state: IAuthState) => {
      if (state.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
      // todo : check other fields in state
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
