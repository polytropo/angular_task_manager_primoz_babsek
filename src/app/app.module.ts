import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
