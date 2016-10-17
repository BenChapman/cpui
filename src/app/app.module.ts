import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CpuiRoutingModule } from './app-routing.module';
import {SelectModule} from 'angular2-select';

import { AppComponent } from './app.component';
import { NinjaRegisterComponent } from './ninja-register/ninja-register.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

import { NinjaService } from './ninja.service';
import { PreFlightComponent } from './pre-flight/pre-flight.component';
import { LoginComponent } from './login/login.component';
import { ParentRegisterComponent } from './parent-register/parent-register.component';

@NgModule({
  declarations: [
    AppComponent,
    NinjaRegisterComponent,
    ProgressBarComponent,
    PreFlightComponent,
    LoginComponent,
    ParentRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CpuiRoutingModule,
    SelectModule
  ],
  providers: [ NinjaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
