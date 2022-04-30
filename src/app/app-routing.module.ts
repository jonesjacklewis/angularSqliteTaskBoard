import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { AddCategoryComponent } from './add-category/add-category.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  {
    path: "addCategory",
    component: AddCategoryComponent
  },{
    path: "taskboard/:boardname",
    component: TaskboardComponent
  },{
    path: "taskboard",
    redirectTo: "/taskboard/Urgent",
    pathMatch: "full"
  },{
    path: "edit/:id",
    component: EditTaskComponent
  },{
    path: "edit",
    redirectTo: "/taskboard/Urgent",
    pathMatch: "full"
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
