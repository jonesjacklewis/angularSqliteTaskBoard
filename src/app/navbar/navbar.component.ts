import { Component, OnInit } from '@angular/core';
import { Requests } from 'src/custom-methods/requests';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  ngOnInit(): void {
    this.categories = JSON.parse(this.requests.httpGet("http://localhost:4000/categories"));
  }

  requests = new Requests();
  categories = [];

}
