import { Injectable } from '@angular/core';
import {IUser} from "../../../models/users";
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor(private storageService :StorageService ) { }

  checkUser(user: IUser) {

      const  isUserExists = this.usersStorage.find((el) => el.login === user.login);

      let isUserSavedInStore = localStorage.getItem('users');
      let userInStore: IUser = <IUser>{} ;

      if (isUserSavedInStore) {
        userInStore = JSON.parse(isUserSavedInStore);
      }

      if (isUserExists) {
        return isUserExists.psw === user.psw;
      }else if (userInStore) {
        return userInStore.psw === user.psw;
      }
      return false;
  }

  setUser(user: IUser, isUserSave: boolean): void {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    if (isUserSave) {
      this.addToStorage(user)
    }
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user);
    }
  }

  isUserExists(user: IUser): boolean {
    const  isUserExists = this.usersStorage.find((el) => el.login === user.login);

    return !!isUserExists;
  }

  addToStorage(user: IUser): void {
    this.storageService.setToStorage('users', user);
  }


}

