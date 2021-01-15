import {Injectable} from '@angular/core';
import {ILoginSuccessPayload} from '../interfaces';

@Injectable()
export class LocalStorageService {

  private readonly storageKey: string = 'egoekalp:auth';


  public writeTokens(tokens: ILoginSuccessPayload): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tokens));
  }


  public getTokens(): ILoginSuccessPayload {
    return JSON.parse(localStorage.getItem(this.storageKey) as string) as ILoginSuccessPayload;
  }

  public deleteTokens(): void {
    localStorage.removeItem(this.storageKey);
  }
}
