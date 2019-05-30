import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectForCreation } from './../../_interfaces/project-for-creation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  public errorMessage: string = '';
  public projectForm: FormGroup;
  public statuses: string[] = ['On Track', 'Off Track', 'At Risk'];
  public priorities: string[] = ['High', 'Medium', 'Low'];

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      status: new FormControl(),
      priority: new FormControl()
    });
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

  public createProject(projectFormValue) {
    if (this.projectForm.valid) {
      this.executeProjectCreation(projectFormValue);
    }
  }

  private executeProjectCreation(projectFormValue) {
    let project: ProjectForCreation = {
      name: projectFormValue.name,
      status: projectFormValue.status,
      priority: projectFormValue.priority
    }

    let apiUrl = 'api/project';
    this.repository.create(apiUrl, project)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToProjectList(){
    this.router.navigate(['/project/list']);
  }

}
