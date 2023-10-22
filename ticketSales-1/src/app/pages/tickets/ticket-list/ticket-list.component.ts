import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../services/tickets/ticket.service';
import { ITour } from 'src/app/models/tours';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TicketsStorageService } from '../../services/tickets-storage/tickets-storage.service';
import { BlocksStyleDirective } from 'src/app/directiive/blocks-style.directive';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets : ITour[] = [];
  loaded = false;

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketStorage: TicketsStorageService
    ) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
      }
    )
  }

  ngAfterViewInit() {
  }

  goToTicketInfoPage(item: ITour) {

    this.router.navigate([`/tickets/ticket/${item.id}`])

   //this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
  }

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #bdbdbd')
    this.blockDirective.initStyle(0);
    this.loaded = true;
  }

}
