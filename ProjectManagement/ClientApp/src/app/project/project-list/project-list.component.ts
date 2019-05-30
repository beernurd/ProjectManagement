import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Project } from './../../_interfaces/project.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
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
    let detailsUrl: string = `/project/details/${id}`
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage(id) {
    let updateUrl: string = `/project/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToCreatePage() {
    let createUrl: string = `/project/create`;
    this.router.navigate([createUrl]);
  }

  public redirectToDeletePage(id){
    let deleteUrl: string = `/project/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}
