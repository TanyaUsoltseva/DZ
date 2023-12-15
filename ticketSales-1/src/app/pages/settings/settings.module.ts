import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { StatisticComponent } from './statistic/statistic/statistic.component';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    SettingsComponent,
    TourLoaderComponent,
    StatisticComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    InputTextModule,
    FormsModule,
    TableModule,
    TabViewModule,
    ReactiveFormsModule,
  ],
  exports: [
    TourLoaderComponent
  ]
})
export class SettingsModule { }
