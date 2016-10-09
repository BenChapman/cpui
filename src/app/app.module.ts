import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CpuiRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NinjaRegisterComponent } from './ninja-register/ninja-register.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

import { NinjaService } from './ninja.service';

@NgModule({
  declarations: [
    AppComponent,
    NinjaRegisterComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CpuiRoutingModule
  ],
  providers: [ NinjaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
