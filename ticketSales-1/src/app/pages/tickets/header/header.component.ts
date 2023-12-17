import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { timeout } from 'rxjs';
import { IUser } from 'src/app/models/users';
import { UserService } from '../../services/user/user.service';
import { IMenuType } from 'src/app/models/menuTupe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  user: IUser | null;


  private timerInterval: number;
  private settingsActive = false;

  constructor(private userService : UserService) { }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Заказы',
        routerLink:['order']
      },
      {
        label: 'Настройки',
        routerLink:['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
      },
    ];
  }

  ngOnInit() {
    this.items = this.initMenuItems();

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    },  1000)

      this.user = this.userService.getUser()  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
 }

}



