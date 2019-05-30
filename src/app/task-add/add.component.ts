import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  private task: any = {
    task: '',
    parent: { task: '' },
    priority: '',
    startDate: '',
    endDate: ''
  };
  private options: Options = {
    floor: 0,
    ceil: 30
  };
  private successMessage: string = '';
  private failureMessage: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  save(event) {
    event.preventDefault();
    this.successMessage = '';
    this.failureMessage = '';
    this.taskService.addTask(this.task).subscribe(
      resp => this.successMessage = 'Task added successfully!',
      error => this.failureMessage = 'Add task failed. Try again later');
  }
}
