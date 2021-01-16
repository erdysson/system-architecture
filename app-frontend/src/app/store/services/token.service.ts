import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class TokenService {

  private readonly jwtHelperService: JwtHelperService;

  constructor() {
    this.jwtHelperService = new JwtHelperService();
  }

  public isExpired(token: string): boolean {
    return this.jwtHelperService.isTokenExpired(token);
  }
}
