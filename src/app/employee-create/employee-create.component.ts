import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  // primeira parte - criar a propriedade que receberá o conjunto de dados
  @Input() employeeDetails = {
    name: '',
    email: '',
    phone: ''
  }

  // segunda parte - definindo as referencias de instancia
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void { }

  // terceira parte - criar a função para acessar o método da REST API para criar o ergistro na base de dados
  addEmployee(){
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
            this.router.navigate(['/employees-list'])
    })
  }

}
