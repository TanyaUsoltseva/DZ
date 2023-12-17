import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../services/tickets/ticket.service';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TicketsStorageService } from '../../services/tickets-storage/tickets-storage.service';
import { BlocksStyleDirective } from 'src/app/directiive/blocks-style.directive';
import { Subscription, debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy{
  tickets : ITour[] = [];
  loaded = false;
  ticketsCopy: ITour[];
  defaultDate: string;


  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  private tourUnsubscriber: Subscription;


  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private ticketStorage: TicketsStorageService,


    ) { }



  ngOnInit(): void {

    this.ticketService.ticketUpdateSubject$.subscribe((data) =>{
      this.tickets = data;
    })
    this.getTickets();

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) => {
      console.log('data', data)

      let ticketType: string;

      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
      }

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      setTimeout(() => {

        this.blockDirective.updateItems();

        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });

    // this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {  console.log('data', data)  });
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement,'keyup');

    this.searchTicketSub = fromEventObserver.pipe(

      debounceTime(200)).subscribe((ev: any) => {

        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el: ITour) => el.name.toLocaleLowerCase().includes(this.ticketSearchValue.toLocaleLowerCase()));
        } else {
          this.tickets = [...this.ticketsCopy];
        }
      });

  }

  goToTicketInfoPage(item: ITour) {

    this.router.navigate([`/tickets/ticket/${item._id}`])

   //this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
  }

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #bdbdbd')
    this.blockDirective.initStyle(0);
    this.loaded = true;
  }

  getTickets() {
    this.ticketService.getTickets().subscribe(
      (data) => {
           this.tickets = data;
           this.ticketsCopy = [...this.tickets];
           this.ticketStorage.setStorage(data);
      }, (err) => {

      }
    )
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
   }

}
