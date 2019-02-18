import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { GridComponent } from './grid/grid.component';

import { CountdownModule } from 'ngx-countdown';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    ExamPageComponent,
    GridComponent,
    HomeComponent,
    InstructionsComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
