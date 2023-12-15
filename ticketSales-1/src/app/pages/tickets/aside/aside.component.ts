import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuType } from 'src/app/models/menuTupe';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { TicketService } from '../../services/tickets/ticket.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SettingsService } from '../../services/settings/settings.service';
import { TicketRestService } from '../../services/rest/ticket-rest.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],


})
export class AsideComponent implements OnInit {

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()


  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];






  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private settingsService: SettingsService,
    private ticketRest: TicketRestService
  ) { }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
}

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    console.log(ev)
    this.ticketService.updateTour(ev.value)
  }

  ngOnInit(): void {

    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  initRestError(): void {


    this.ticketService.getError().subscribe({
      next: (data) => {},
      error: (err) => {
        console.log('err', err)
        this.messageService.add({severity:'error', summary: err.error})
      }
    })
   }

initSettingsData(): void {
  this.settingsService.loadUserSettingsSubject({
    saveToken: false
  });
}

initTours(): void {
  this.ticketRest.initTours().subscribe((data :ITour[]) => {
    this.ticketService.updateTicketList(data);
  });
}

deleteTours(): void {
  this.ticketRest.deleteTours().subscribe((data :Object) => {
    this.ticketService.updateTicketList([]);
  });

}

}
