import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Contact } from './../../_interfaces/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-project-contact-delete',
  templateUrl: './project-contact-delete.component.html',
  styleUrls: ['./project-contact-delete.component.css']
})
export class ProjectContactDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public contacts: Contact[];
  public selectedContacts: any[];
  public selectedAll: any;
  public noContact: boolean = false;
  public selectAllChk: boolean = false;
  public hasInitialContact: boolean = false;
 
constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
  private activeRoute: ActivatedRoute) { }
 
  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiAddress: string = `api/project/contacts/${id}`;
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.selectedContacts = res as any[];
        this.hasInitialContact = this.selectedContacts.length > 0 ? true : false;
        this.initSelectedContacts();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public selectAll() {
    for (var i = 0; i < this.selectedContacts.length; i++) {
      this.selectedContacts[i].selected = this.selectedAll;
    }
  }
  public checkIfAllSelected() {
    this.selectedAll = this.selectedContacts.every(function (item: any) {
      return item.selected == true;
    });
  }

  private initSelectedContacts() {
    this.selectAllChk = this.selectedContacts.length > 0 ? true : false;
    this.selectedContacts.map(obj => {
      obj.selected = false;
      return obj;
    });
  }

  private contactsToDelete() {
    return this.selectedContacts.reduce(function (filtered, obj) {
      if (obj.selected) {
        let ret = Object.assign({}, obj);
        delete ret.selected;
        filtered.push(ret);
      }
      return filtered;
    }, []);
  }
   
  public redirectToProjectList() {
    this.router.navigate(['/project-contact/list']);
  }

  public deleteContacts() {
    let contacts = this.contactsToDelete();
    this.noContact = contacts.length == 0 ? true : false;
    if (!this.noContact) {
      let id: string = this.activeRoute.snapshot.params['id'];
      let deleteUrl: string = `api/project/deletecontact/${id}`;
      this.repository.deleteEx(deleteUrl, contacts)
        .subscribe(res => {
          (<any>$('#successModal')).modal();
        },
          (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
    }
  }
}
