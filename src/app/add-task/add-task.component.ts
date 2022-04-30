import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Requests } from 'src/custom-methods/requests';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.categories = JSON.parse(this.requests.httpGet("http://localhost:4000/getCategories"));
  }

  addTaskForm = this.formBuilder.group({
    taskId: null,
    taskHeading: '',
    taskBody: '',
    taskCategory: '',
    taskComplete: false
  });

  categories = [];

  taskHeading: string = "";
  taskBody: string = "";
  taskCategory: string = "";
  taskComplete: boolean = false;
  requests = new Requests();
  task: Task = {
    taskId: 0,
    taskHeading: '',
    taskBody: '',
    taskCategory: "",
    taskComplete: false
  };

  onSubmit(){

    if(
      this.addTaskForm.value.taskHeading.length > 0 &&
      this.addTaskForm.value.taskBody.length > 0 &&
      this.addTaskForm.value.taskCategory.length > 0
    ){
      this.requests.httpPost("http://localhost:4000/addTask", {
        taskHeading: this.addTaskForm.value.taskHeading,
        taskBody: this.addTaskForm.value.taskBody,
        taskCategory: this.addTaskForm.value.taskCategory,
        taskComplete: this.addTaskForm.value.taskComplete ? 1 : 0
      });
      window.location.reload();
    }else{
      window.alert("Must Enter a Valid Category Name!")
    }


  }


}
