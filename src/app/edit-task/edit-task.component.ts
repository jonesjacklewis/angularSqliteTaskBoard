import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requests } from 'src/custom-methods/requests';
import { Task } from '../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = JSON.parse(this.requests.httpGet("http://localhost:4000/getCategories"));
    this.taskId = Number(this.activatedRoute.snapshot.url[1].toString());

    if(
      this.taskId < 0 ||
      isNaN(this.taskId) ||
      JSON.parse(this.requests.httpGet(`http://localhost:4000/getTask/${this.taskId}`))[0] != undefined
    ){
      window.alert("Invalid ID");
      window.location.href = "/taskboard/Urgent";
    }else{
      this.taskHeading = JSON.parse(this.requests.httpGet(`http://localhost:4000/getTask/${this.taskId}`)).heading;
      this.taskBody = JSON.parse(this.requests.httpGet(`http://localhost:4000/getTask/${this.taskId}`)).body;
      this.taskCategory = JSON.parse(this.requests.httpGet(`http://localhost:4000/getTask/${this.taskId}`)).category;
      this.taskComplete = JSON.parse(this.requests.httpGet(`http://localhost:4000/getTask/${this.taskId}`)).complete == 1;

      this.editTaskForm.setValue(
        {
          taskId: this.taskId,
    taskHeading: this.taskHeading,
    taskBody: this.taskBody,
    taskCategory: this.taskCategory,
    taskComplete: this.taskComplete
        }
      )

    }

  }



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

  taskId = 0;
  jsonData = {};

  editTaskForm = this.formBuilder.group({
    taskId: this.taskId,
    taskHeading: this.taskHeading,
    taskBody: this.taskBody,
    taskCategory: this.taskCategory,
    taskComplete: this.taskComplete
  });


  onSubmit(){

    if(
      this.editTaskForm.value.taskHeading.length > 0 &&
      this.editTaskForm.value.taskBody.length > 0 &&
      this.editTaskForm.value.taskCategory.length > 0
    ){
      this.requests.httpPost("http://localhost:4000/editTask", {
        taskId: this.taskId,
        taskHeading: this.editTaskForm.value.taskHeading,
        taskBody: this.editTaskForm.value.taskBody,
        taskCategory: this.editTaskForm.value.taskCategory,
        taskComplete: this.editTaskForm.value.taskComplete ? 1 : 0
      });
      window.location.href = `/taskboard/${this.editTaskForm.value.taskCategory}`;
    }else{
      window.alert("Must Enter a Valid Category Name!")
    }


  }


}
