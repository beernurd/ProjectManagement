import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: ContactListComponent },
      { path: 'details/:id', component: ContactDetailsComponent },
      { path: 'create', component: ContactCreateComponent },
      { path: 'update/:id', component: ContactUpdateComponent },
      { path: 'delete/:id', component: ContactDeleteComponent }
    ])
  ],
  declarations: [
    ContactListComponent,
    ContactDetailsComponent,
    ContactCreateComponent,
    ContactUpdateComponent,
    ContactDeleteComponent
  ]
})
export class ContactModule { }
