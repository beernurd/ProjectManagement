import { Component, OnInit } from '@angular/core';
import { Contact } from './../../_interfaces/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  public contact: Contact;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getContactDetails()
  }

  getContactDetails(){
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/contact/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.contact = res as Contact;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public redirectToContactList() {
    this.router.navigate(['/contact/list']);
  }

}
