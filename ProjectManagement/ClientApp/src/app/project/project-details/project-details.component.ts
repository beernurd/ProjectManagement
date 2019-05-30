import { Component, OnInit } from '@angular/core';
import { Project } from './../../_interfaces/project.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public project: Project;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getProjectDetails()
  }

  getProjectDetails(){
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/project/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.project = res as Project;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public redirectToProjectList() {
    this.router.navigate(['/project/list']);
  }

}
