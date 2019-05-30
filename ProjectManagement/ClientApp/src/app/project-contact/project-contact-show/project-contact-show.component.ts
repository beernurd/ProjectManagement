import { Component, OnInit } from '@angular/core';
import { Contact } from './../../_interfaces/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-project-contact-show',
  templateUrl: './project-contact-show.component.html',
  styleUrls: ['./project-contact-show.component.css']
})
export class ProjectContactShowComponent implements OnInit {
  public contacts: Contact[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getProjectContacts()
  }

  getProjectContacts(){
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/project/contacts/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.contacts = res as Contact[];
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public redirectToProjectList() {
    this.router.navigate(['/project-contact/list']);
  }

}
