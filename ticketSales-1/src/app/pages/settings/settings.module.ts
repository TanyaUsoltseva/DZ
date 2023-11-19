import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { StatisticComponent } from './statistic/statistic/statistic.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    InputTextModule,
    FormsModule,
    TabViewModule,
  ],
})
export class SettingsModule { }
