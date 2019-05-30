import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './../../_interfaces/project.model';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public project: Project;
  public projectForm: FormGroup;
  public statuses: string[] = ['On Track', 'Off Track', 'At Risk'];
  public priorities: string[] = ['High', 'Medium', 'Low'];

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      status: new FormControl(),
      priority: new FormControl()
    });

    this.getProjectById();
  }

  private getProjectById() {
    let projectId: string = this.activeRoute.snapshot.params['id'];

    let projectByIdUrl: string = `api/project/${projectId}`;

    this.repository.getData(projectByIdUrl)
      .subscribe(res => {
        this.project = res as Project;
        this.projectForm.patchValue(this.project);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public validateControl(controlName: string) {
    if (this.projectForm.controls[controlName].invalid && this.projectForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.projectForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public redirectToProjectList() {
    this.router.navigate(['/project/list']);
  }

  public updateProject(projectFormValue) {
    if (this.projectForm.valid) {
      this.executeProjectUpdate(projectFormValue);
    }
  }

  private executeProjectUpdate(projectFormValue) {

    this.project.name = projectFormValue.name,
      this.project.status = projectFormValue.status,
      this.project.priority = projectFormValue.priority

    let apiUrl = `api/project/${this.project.id}`;
    this.repository.update(apiUrl, this.project)
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
