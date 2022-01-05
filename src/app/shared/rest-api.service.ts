import { Injectable } from '@angular/core';

// importando os recursos necessários
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()

export class RestApiService {
  // Definindo o caminho para a base de dados
  apiURL = 'http://localhost:3000'

  // definindo a referencia de instancia do recurso HttpClient
  constructor(private http: HttpClient){ }

  // credenciais de acesso ao back-end domain para modifica-lo
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*
  ===============================================================
          CONSTRUINDO A API E SEUS RESPECTIVOS MÉTODOS
  ===============================================================
   */

  // aqui, estamos recuperando o conjunto de dados para a criação de uma lista de exibição
  getEmployees(): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + '/employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  // recuperar um único registro da base de dados
   getEmployee(id:any): Observable<Employee>{
     return this.http.get<Employee>(this.apiURL + '/employees/' + id)
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
   }

   // método para inserir dados em nossa base employees
   createEmployee(employee:any): Observable<Employee>{
     return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
   }

   // metodo para atualizar a base de dados
   updateEmployee(id: any, employee:any): Observable<Employee>{
     return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
   }

   // método de exclusão de registro
   deleteEmployee(id: any){
     return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
   }
   // função para tratamento de erros da aplicação - erro no front ou no back-end
   handleError(erro: any){
     // criar uma propridade para receber uma mensagem em relação ao erro ocorrido
     let mensagemErro = ''
     // verificando onde - em qual parte da aplicação o erro ocorreu
     if(erro.error instanceof ErrorEvent){
       // tratando o erro - na parte front-end
       mensagemErro = erro.error.message
     }else{
       // tratando o erro - ocorrido na parte back-end
       mensagemErro = `Codigo do erro: ${erro.status}\nMensagem do erro:${erro.message}`
     } 
     window.alert(mensagemErro)
     return throwError(mensagemErro)
   }

}
