import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Task } from '../models/Task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[];
  private taskSource = new BehaviorSubject<Task>({id: null, title: null, dueDate: null, resolvedAt: null, description: null, priority: null, status: null});
  selectedTask = this.taskSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // this.tasks = [
    //   {id: '123', title: 'first task', dueDate: '2019-08-22', resolvedAt: '2018-08-20', description: 'This is my first task in task app', priority: 'high', status: 'finished'},
    //   {id: '345', title: 'second task', dueDate: '2018-04-06', resolvedAt: '2018-03-20', description: 'This is my 2nd task in task app', priority: 'medium', status: 'finished'},
    //   {id: '678', title: 'third task', dueDate: '2017-11-27', description: 'This is my 3rd task in task app', priority: 'low', status: 'unfinished'}
    // ]
    this.tasks = [];
  }
  // cmp = function(a, b) {
  //   if (a > b) return +1;
  //   if (a < b) return -1;
  //   return 0;
  // }
  
  getTasks(): Observable<Task[]> {
    if(localStorage.getItem('tasks') === null) {
      this.tasks = [];
    } else {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    return of(this.tasks.sort(function(a,b) {return (a.dueDate > b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0);
    })); 
  }

  sortByDate() {
    return of(this.tasks.sort(function(a,b) {return (a.dueDate > b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0);
    })); 
  }

  setFormTask(task: Task) {
    this.taskSource.next(task);
  }

  addTask(task: Task) {
    this.tasks.unshift(task);
    // add to local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.sortByDate();
  }

  updateTask(task: Task) {
    this.tasks.forEach((cur, index) => {
      if(task.id === cur.id) {
        this.tasks.splice(index, 1);
      }
    });
    this.tasks.unshift(task);
    // Update local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.sortByDate(); 
  }

  deleteTask(task: Task) {
    this.tasks.forEach((cur, index) => {
      if(task.id === cur.id) {
        this.tasks.splice(index, 1);
      }
    });
    // delete from local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
