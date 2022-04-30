import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Requests } from 'src/custom-methods/requests';
import {Router} from "@angular/router"

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  addCategoryForm = this.formBuilder.group({
    categoryName: '',
  });

  categoryName: string = "";
  requests = new Requests();


  onSubmit(){
    this.categoryName = this.addCategoryForm.value.categoryName;

    if(this.categoryName.length > 0){
      this.requests.httpPost("http://localhost:4000/addCategory", {
        categoryName: this.categoryName
      });

      window.location.reload();

    }else{
      window.alert("Must Enter a Valid Category Name!")
    }

  }



}
