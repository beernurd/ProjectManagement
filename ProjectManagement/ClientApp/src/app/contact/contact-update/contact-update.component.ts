import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './../../_interfaces/contact.model';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public contact: Contact;
  public contactForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getContactById();
  }

  private getContactById() {
    let contactId: string = this.activeRoute.snapshot.params['id'];

    let contactByIdUrl: string = `api/contact/${contactId}`;

    this.repository.getData(contactByIdUrl)
      .subscribe(res => {
        this.contact = res as Contact;
        this.contactForm.patchValue(this.contact);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public validateControl(controlName: string) {
    if (this.contactForm.controls[controlName].invalid && this.contactForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.contactForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public redirectToContactList() {
    this.router.navigate(['/contact/list']);
  }

  public updateContact(contactFormValue) {
    if (this.contactForm.valid) {
      this.executeContactUpdate(contactFormValue);
    }
  }

  private executeContactUpdate(contactFormValue) {

    this.contact.name = contactFormValue.name,
      this.contact.email = contactFormValue.email,
      this.contact.address = contactFormValue.address

    let apiUrl = `api/contact/${this.contact.id}`;
    this.repository.update(apiUrl, this.contact)
      .subscribe(res => {
        (<any>$('#successModal')).modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

}
