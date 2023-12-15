import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUser;

  private token: string;

  constructor( private storageService: StorageService) { }

  getUser(): IUser {
    return this.user;
  };
  setUser(user: IUser): void {
    this.user = user;
  };

  setToken(token: string): void {
    this.token = token;
  }

  setToStore(token: string) {
    this.storageService.setToStorage('token', token)
  }

  getToken(): string {
    return this.token;
  }



}
