import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  psw: string;
  NewPsw: string;
  pswRepeat: string;

  constructor(
              private authService: AuthService,
              private messageService : MessageService,

  ) { }

  ngOnInit(): void {

  }

  registration(ev: Event): void | boolean {
    if (this.NewPsw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают!'});
      return false;
    }

  }
}
