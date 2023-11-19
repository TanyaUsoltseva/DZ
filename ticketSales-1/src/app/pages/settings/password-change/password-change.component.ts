import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user/user.service';
import { IUser } from 'src/app/models/users';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  psw: string;
  newPsw: string;
  pswRepeat: string;
  user: IUser;

  constructor(
    private messageService : MessageService,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  PasswordChange(ev: Event): void | boolean {
    if (this.newPsw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают!'});
      return false;
    }

    if (this.newPsw === this.user.psw) {
      this.messageService.add({severity:'error', summary:'Старый пароль совпадает с новым!'});
      return false
    } else {
      this.user.psw = this.newPsw;
      this.authService.addToStorage(this.user);
      this.messageService.add({severity:'success', summary:'Пароль успешно сохранён!'});
    }
  }
}
