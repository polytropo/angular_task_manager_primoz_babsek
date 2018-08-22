import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  formHide: boolean = false;
  id: string;
  title: string;
  dueDate: any;
  resolvedAt?: any;
  description: string;
  priority: string;
  status: string = "unfinished";
  isNew: boolean = true;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    //Subscribe to the observable
    this.taskService.selectedTask.subscribe(task => {
      if(task.id !== null) {
        this.formHide = true;
        this.isNew = false;
        this.id = task.id;
        this.title = task.title;
        this.dueDate = task.dueDate;
        this.resolvedAt = task.resolvedAt;
        this.description = task.description;
        this.priority = task.priority;
        this.status = task.status;
      }
    });
  }

  toggleVisibility() {
    this.formHide = !this.formHide;
    this.clearState();
  }
  onSubmit() {
    // Check if new task
    if(this.isNew) {
      // Create new task 
      const newTask = {
        id: this.generateId(),
        title: this.title,
        dueDate: this.dueDate,
        resolvedAt: this.resolvedAt,
        description: this.description,
        priority: this.priority,
        status: this.status
      }   
      // Add Task
      this.taskService.addTask(newTask);
    } else {
      // Create Task to be updated
      const updateTask = {
        id: this.id,
        title: this.title,
        dueDate: this.dueDate,
        resolvedAt: this.resolvedAt,
        description: this.description,
        priority: this.priority,
        status: this.status
      }
      //Update Task
      this.taskService.updateTask(updateTask);
    }
    // Clear state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.title ='';
    this.dueDate = '';
    this.resolvedAt = '';
    this.description = '';
    this.priority = '';
    this.status = 'unfinished';
    this.taskService.clearState();
  }

  generateId() {
    // Create a random id https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
