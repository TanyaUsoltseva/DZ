import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomTicketData, INearestTour, ITour, ITourLocation } from 'src/app/models/tours';
import { TicketsStorageService } from '../../services/tickets-storage/tickets-storage.service';
import { IUser } from 'src/app/models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { TicketService } from '../../services/tickets/ticket.service';
import { Subscription, forkJoin, fromEvent } from 'rxjs';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;

  ticketSearchValue: string;
  nearestTours: ICustomTicketData[];

  // nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];

  constructor(
      private route: ActivatedRoute,
      private ticketStorage: TicketsStorageService,
      private userService: UserService,
      private ticketService: TicketService
  ) { }


  ngOnInit(): void {
    // init formGroup
    this.user = this.userService.getUser()

    this.userForm = new FormGroup( {
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(this.user?.cardNumber),
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    });

    // get nearest tours

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      this.toursLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1]);
    });

    // params

    const routeIdParam = this. route.snapshot.paramMap.get('id');


    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    });
  }

  ngOnDestroy(): void{
    this.searchTicketSub.unsubscribe();

  }

  initSearchTour(): void {

    const type = Math.floor(Math.random() * this.searchTypes.length);
    // unsubscribe
    if (this. ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type). subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    });
  }

  onSubmit(): void {}

  selectDate(ev: Event): void {

  }

}
