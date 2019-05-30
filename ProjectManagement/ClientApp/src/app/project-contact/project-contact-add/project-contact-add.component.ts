import { Component, OnInit } from '@angular/core';
import { Contact } from './../../_interfaces/contact.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-contact-add',
  templateUrl: './project-contact-add.component.html',
  styleUrls: ['./project-contact-add.component.css']
})
export class ProjectContactAddComponent implements OnInit {
  public errorMessage: string = '';
  public contacts: Contact[];
  public selectedContacts: any[];
  public selectedAll: any;
  public selectAllChk: boolean = false;
  public allContacts: any[];
  public noContact: boolean = false;
  public hasInitialContact: boolean = false;

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiAddress: string = `api/contact`;
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.allContacts = res as any[];
        apiAddress = `api/project/contacts/${id}`;
        this.repository.getData(apiAddress)
          .subscribe(res => {
            let response = res as any[];
            this.selectedContacts = this.getContactsToAdd(response);
            this.hasInitialContact = this.selectedContacts.length > 0 ? true : false;
            this.initSelectedContacts();
          },
          (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
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

  public getContactsToAdd(response) {
    return this.allContacts.reduce(function (filtered, obj1) {
      var obj = response.find(obj2 => obj1.id == obj2.id);
      if (!obj)
        filtered.push(obj1);
      return filtered;
    }, [])
  }

  private initSelectedContacts() {
    this.selectAllChk = this.selectedContacts.length > 0 ? true : false;
    this.selectedContacts.map(obj => {
      obj.selected = false;
      return obj;
    });
  }

  private contactsToAdd() {
    return this.selectedContacts.reduce(function (filtered, obj) {
      if (obj.selected) {
        let ret = Object.assign({}, obj);
        delete ret.selected;
        filtered.push(ret);
      }
      return filtered;
    }, []);
  }
  
  public addContacts() {
    let contacts = this.contactsToAdd();
    this.noContact = contacts.length == 0 ? true : false;
    if (!this.noContact) {
      let id: string = this.activeRoute.snapshot.params['id'];
      let apiUrl = `api/project/addcontact/${id}`;
      this.repository.add(apiUrl, contacts)
        .subscribe(res => {
          $('#successModal').modal();
        },
          (error => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          })
        )
    }
  }

  public redirectToProjectList(){
    this.router.navigate(['/project-contact/list']);
  }

}
