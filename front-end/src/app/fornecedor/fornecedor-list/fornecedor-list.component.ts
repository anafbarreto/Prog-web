import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.scss']
})
export class FornecedorListComponent implements OnInit {

  editora : any = [] //vetor vazio
  displayedColumns : string [] = ['_id', 'nome_fantasia', 'cnpj', 'telefone']

  constructor(private fornecedorSrv : FornecedorService) { }

  async ngOnInit() {
    this.editora = await this.fornecedorSrv.listar()
    console.log(this.editora)
    
  }

}
