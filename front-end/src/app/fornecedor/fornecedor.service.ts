import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  // injeção de dependencias: ao invés de criarmos manualmente as dependencias necessárias
  // o próprio Angular cria e injeta o objeto já instanciado
  // como parametro do construtor

  constructor(private http:  HttpClient) { }

  listar(){
    return this.http.get('http://localhost:3000/editora').toPromise()
    
  }

  excluir(id: string){
    return this.http.request('DELETE','http://localhost:3000/editora', {body: {_id: id} } ).toPromise()

  }

}
