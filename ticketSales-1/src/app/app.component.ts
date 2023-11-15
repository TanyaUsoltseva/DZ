import { Component } from '@angular/core';
import { ObservableExampleService } from './pages/services/testing/observable-example.service';
import { ConfigService } from './pages/services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop: string;


  constructor(
    private testing: ObservableExampleService,
    private config: ConfigService

    ) {
  }

  ngOnInit() {
    this.config.configLoad()


    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {

    });

    myObservable.subscribe((data) => {

    });

    const mySubject = this.testing.getSubject();

    // mySubject.subscribe((data) => {
    //   console.log('first data subject', data)
    // });

    // mySubject.subscribe((data) => {
    //   console.log('second data subject', data)
    // });

    mySubject.next('subject value');

    mySubject.next('subject value');

    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.subscribe((data) => {
      console.log('first data behaviorSubject', data)
    });

    myBehavior.next('new data from behaviorSubject');
    myBehavior.next('new data1 from behaviorSubject');


  }
}
