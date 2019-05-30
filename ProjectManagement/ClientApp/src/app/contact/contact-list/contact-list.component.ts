import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Contact } from './../../_interfaces/contact.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts() {
    let apiAddress: string = "api/contact";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.contacts = res as Contact[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public getContactDetails(id) {
    let detailsUrl: string = `/contact/details/${id}`
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage(id) {
    let updateUrl: string = `/contact/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToCreatePage() {
    let createUrl: string = `/contact/create`;
    this.router.navigate([createUrl]);
  }

  public redirectToDeletePage(id){
    let deleteUrl: string = `/contact/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}
