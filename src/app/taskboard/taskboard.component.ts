import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Requests } from 'src/custom-methods/requests';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.css']
})
export class TaskboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.boardname = params["boardname"];
      this.tasks = JSON.parse(this.requests.httpGet(`http://localhost:4000/getTasks/${this.boardname}`));
    })
  }

  tasks = [];
  boardname = "";
  requests = new Requests();



  delete(id: number){
    this.requests.httpDelete(`http://localhost:4000/deleteTask/${id}`);
    window.location.reload();
  }

  edit(id: number){
    window.location.href = `/edit/${id}`;
  }


}
