import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/models/error';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText='Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(
    private  authService: AuthService,
     private messageService: MessageService,
     private router: Router,
     private route: ActivatedRoute,
     private userService: UserService,
     private http: HttpClient,
     ) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {
    console.log("d")
  }

  vipStatusSelected() :void {

  }

  onAuth(ev: Event): void {
      const authUser: IUser = {
        psw : this.psw,
        login: this.login,
        cardNumber: this.cardNumber

      }

      this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data : {access_token: string, id: string}) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);
      this.router.navigate(['tickets/tickets-list']);

    }, (err: HttpErrorResponse)=> {
      const serverError =<ServerError>err.error;
      this.messageService.add({severity:'warn', summary:serverError.errorText});
    });
  }


}
