import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { Observable, Subject, map } from 'rxjs';
import { ICustomTicketData, INearestTour, ITour, ITourLocation, ITourTypeSelect } from 'src/app/models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject = new Subject<ITourTypeSelect>();

  readonly ticketType$ = this.ticketSubject.asObservable();


  constructor(
    private ticketServiceRest: TicketRestService,
    ) { }


 // 2 вариант доступа к Observable

 getTicketTypeObservable(): Observable<ITourTypeSelect> {
  return this.ticketSubject.asObservable();
 }

 updateTour(type:ITourTypeSelect): void {
   this.ticketSubject.next(type);
 }

 getTickets(): Observable<ITour[]> {
  return this.ticketServiceRest.getTickets().pipe(map(

    (value) => {
      const singleTours = value.filter((el) => el.type === "single");
      return value.concat(singleTours);

    }


  ));
}

getError(): Observable<any>{
  return this.ticketServiceRest.getRestError();
}

getNearestTours(): Observable<INearestTour[]> {
  return this.ticketServiceRest.getNearestTickets();
}

getToursLocation(): Observable<ITourLocation[]> {
  return this.ticketServiceRest.getLocationList();
}

transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
  const newTicketData: ICustomTicketData[] = [];
  data.forEach((el: INearestTour) => {
    const newEl = <ICustomTicketData> {...el};
    newEl.region = <ICustomTicketData>regions.find((region : ITourLocation) => el.locationId === region.id) || {};
    newTicketData.push(newEl);
  });
  return  newTicketData;
}

getRandomNearestEvent(type: number): Observable<INearestTour> {
  return this.ticketServiceRest.getRandomNearestEvent(type);
}

sendTourData(data: any): Observable<any> {
  return this.ticketServiceRest.sendTourData(data);
}

}
