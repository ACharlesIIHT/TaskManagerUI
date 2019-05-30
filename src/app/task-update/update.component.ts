import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { DatePipe } from '@angular/common';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private todayDate: any = new Date();
  private id: any;
  private viewOnly: boolean = false;
  private options: Options = {
    floor: 0,
    ceil: 30
  };
  private task: any;
  private successMessage: string = '';
  private failureMessage: string = '';

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(this.id).subscribe(resp => {
      this.task = resp;
      if (this.task.task) {
        this.viewOnly = (this.task.endDate <= this.todayDate);
      }
    });
  }

  updateTask(event) {
    event.preventDefault();
    this.successMessage = '';
    this.failureMessage = '';
    this.taskService.updateTask(this.task).subscribe(
      resp => this.successMessage = 'Task updated successfully!',
      error => this.failureMessage = 'update failed. Try again later');
    // this.router.navigate(['/view']);
  }
}
