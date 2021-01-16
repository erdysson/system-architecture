import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  private readonly storagePrefix: string = 'egoekalp';

  public write(key: string, value: any): void {
    localStorage.setItem(`${this.storagePrefix}:${key}`, JSON.stringify(value));
  }


  public get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(`${this.storagePrefix}:${key}`) as string) as T;
  }

  public delete(key: string): void {
    localStorage.removeItem(`${this.storagePrefix}:${key}`);
  }
}
