import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from './../../environments/environment'; // importando a api base

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // injeção de dependencias: ao invés de criarmos manualmente as dependencias necessárias
  // o próprio Angular cria e injeta o objeto já instanciado
  // como parametro do construtor

  constructor(private http: HttpClient) { }


   // nomeia a api base para substituir o http://localhost:3000/cliente
   // apiBaseUri é gerada em environments.ts
   // apiBaseUri = http://localhost:3000/ + cliente 
   
  private apiUri: string = env.apiBaseUri + 'cliente' 

  listar() {
    return this.http.get('http://localhost:3000/cliente').toPromise()
  }

  /* listar() {
    return this.http.get('this.apiUri').toPromise()
  }
  */

  excluir(id: string) {
    return this.http.request('DELETE', 'http://localhost:3000/cliente', { body: { _id: id } }).toPromise()

  }

  novo(body: any) {
    return this.http.post('http://localhost:3000/cliente', body).toPromise
  }

  atualizar(body: any) {
    return this.http.put('http://localhost:3000/cliente', body).toPromise
  }

  obterUm(id: string) {
    return this.http.get('http://localhost:3000/cliente' + '/' + id).toPromise
  }

}

