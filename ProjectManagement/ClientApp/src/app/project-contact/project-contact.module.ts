import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProjectContactListComponent } from './project-contact-list/project-contact-list.component';
import { ProjectContactShowComponent } from './project-contact-show/project-contact-show.component';
import { ProjectContactAddComponent } from './project-contact-add/project-contact-add.component';
import { ProjectContactDeleteComponent } from './project-contact-delete/project-contact-delete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'list', component: ProjectContactListComponent },
      { path: 'show/:id', component: ProjectContactShowComponent },
      { path: 'add/:id', component: ProjectContactAddComponent },
      { path: 'delete/:id', component: ProjectContactDeleteComponent }
    ])
  ],
  declarations: [
    ProjectContactListComponent,
    ProjectContactShowComponent,
    ProjectContactAddComponent,
    ProjectContactDeleteComponent
  ]
})
export class ProjectContactModule { }
