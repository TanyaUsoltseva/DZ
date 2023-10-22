import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../services/auth/auth.service";
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  selectedValue = false;

  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  registration(ev: Event): void | boolean {
    console.log(this.selectedValue)
    if (this.psw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }


    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }

    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj, this.selectedValue);
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
    } else {
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    }

  }


}
