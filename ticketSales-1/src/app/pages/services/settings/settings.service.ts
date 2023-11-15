import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { ISettings } from 'src/app/models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() { }

  loadUserSettings(): Observable<ISettings> {
    const settingObservable = new Observable<ISettings>((Subscriber) => {
      const settingsData: ISettings = {
        saveToken: true
      };
      Subscriber.next(settingsData);
    });
    return settingObservable;
  }

  loadUserSettingsSubject(data: ISettings): any {
    this.settingsSubject.next(data)
  }

  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingsSubject.asObservable()
  }


}

