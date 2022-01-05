import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  // primeira parte - criar uma "copia - tirar uma foto" da rota pela qual os dados circularão
  id = this.actRoute.snapshot.params['id']
  dadosRegistro: any = {}
  //segunda parte - instituir as referencias de instancia
  constructor(
   public restApi: RestApiService,
   public actRoute: ActivatedRoute,
   public router: Router
  ) { }
 // terceira parte - priorizando o carregamento do registro para edição
  ngOnInit(): void {
    this.restApi.getEmployee(this.id).subscribe((data: {}) =>{
      this.dadosRegistro = data
    })
  }
  // quarta parte - criar a função para acessar o metodo de atualização criado na REST API
  atualizarRegistro(){
    if(window.confirm('Tem certeza que deseja atualizar o registro?')){
      this.restApi.updateEmployee(this.id, this.dadosRegistro).subscribe((data: any) => this.router.navigate(['/employees-list']))
    }
  }

}
