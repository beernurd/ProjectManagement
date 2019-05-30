import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Contact } from './../../_interfaces/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public contact: Contact;
 
constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
  private activeRoute: ActivatedRoute) { }
 
  ngOnInit() {
    this.getContactById();
  }
   
  private getContactById() {
    let contactId: string = this.activeRoute.snapshot.params['id'];
    let contactByIdUrl: string = `api/contact/${contactId}`;
   
    this.repository.getData(contactByIdUrl)
      .subscribe(res => {
        this.contact = res as Contact;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
   
  public redirectToContactList() {
    this.router.navigate(['/contact/list']);
  }

  public deleteContact() {
    let deleteUrl: string = `api/contact/${this.contact.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        (<any>$('#successModal')).modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
}
