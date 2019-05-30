import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Project } from './../../_interfaces/project.model';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public project: Project;
 
constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
  private activeRoute: ActivatedRoute) { }
 
  ngOnInit() {
    this.getProjectById();
  }
   
  private getProjectById() {
    let projectId: string = this.activeRoute.snapshot.params['id'];
    let projectByIdUrl: string = `api/project/${projectId}`;
   
    this.repository.getData(projectByIdUrl)
      .subscribe(res => {
        this.project = res as Project;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
   
  public redirectToProjectList() {
    this.router.navigate(['/project/list']);
  }

  public deleteProject() {
    let deleteUrl: string = `api/project/${this.project.id}`;
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
