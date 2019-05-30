import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Project } from './../../_interfaces/project.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-contact-list',
  templateUrl: './project-contact-list.component.html',
  styleUrls: ['./project-contact-list.component.css']
})
export class ProjectContactListComponent implements OnInit {
  public projects: Project[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllProjects();
  }

  public getAllProjects() {
    let apiAddress: string = "api/project";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.projects = res as Project[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public getProjectDetails(id) {
    let detailsUrl: string = `/project-contact/show/${id}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToAddPage(id) {
    let updateUrl: string = `/project-contact/add/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(id){
    let deleteUrl: string = `/project-contact/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}
