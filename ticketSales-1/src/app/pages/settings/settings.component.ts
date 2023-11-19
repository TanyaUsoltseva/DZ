import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableExampleService } from '../services/testing/observable-example.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { IMenuType } from 'src/app/models/menuTupe';
import { MenuItem } from 'primeng/api';
import { SettingsService } from '../services/settings/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subjectScope = this.observableExmpleService.getSubject();
  private subjectForUnsubscribe = new Subject();

  constructor(
    private observableExmpleService: ObservableExampleService,
    private settingsService: SettingsService
  ) { }


  ngOnInit(): void {
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
        console.log('settings data', data)
    });

    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log('settings data from subject', data)
      });
    }

  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

}
