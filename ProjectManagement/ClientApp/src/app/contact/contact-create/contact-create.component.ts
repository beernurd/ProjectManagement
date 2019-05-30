import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactForCreation } from './../../_interfaces/contact-for-creation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  public errorMessage: string = '';

  public contactForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
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

  public createContact(contactFormValue) {
    if (this.contactForm.valid) {
      this.executeContactCreation(contactFormValue);
    }
  }

  private executeContactCreation(contactFormValue) {
    let contact: ContactForCreation = {
      name: contactFormValue.name,
      email: contactFormValue.email,
      address: contactFormValue.address
    }

    let apiUrl = 'api/contact';
    this.repository.create(apiUrl, contact)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToContactList(){
    this.router.navigate(['/contact/list']);
  }

}
