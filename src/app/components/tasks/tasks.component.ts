import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;
  loaded: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedTask = {
          id: '',
          title: '',
          dueDate: '',
          resolvedAt: '',
          description: '',
          priority: '',
          status: ''
        }
      }
    })
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.loaded = true;
    }); 
  }

  onSelect(task: Task) {
    this.taskService.setFormTask(task);
    this.selectedTask = task;
  }

  onDelete(task: Task) {
    if(confirm('Do you really want to delete the task?')) {
      this.taskService.deleteTask(task);
    }
  }
}
