import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ExamPageComponent } from './exam-page/exam-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'exam-page', component: ExamPageComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
