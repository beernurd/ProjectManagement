import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: ProjectListComponent },
      { path: 'details/:id', component: ProjectDetailsComponent },
      { path: 'create', component: ProjectCreateComponent },
      { path: 'update/:id', component: ProjectUpdateComponent },
      { path: 'delete/:id', component: ProjectDeleteComponent }
    ])
  ],
  declarations: [
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    ProjectDeleteComponent
  ]
})
export class ProjectModule { }
