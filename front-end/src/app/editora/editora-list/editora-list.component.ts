import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../editora.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';


@Component({
  selector: 'app-editora-list',
  templateUrl: './editora-list.component.html',
  styleUrls: ['./editora-list.component.scss']
})
export class EditoraListComponent implements OnInit {

  editora: any = [] //vetor vazio

  displayedColumns: string [] = ['_id', 'nome_fantasia', 'cnpj', 'telefone', 'editar', 'excluir']

  constructor(private editoraSrv: EditoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {

  }

  async ngOnInit() {
    this.editora = await this.editoraSrv.listar()
    console.log(this.editora)

  }

  async excluirCadastro(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '40%',
      data: { question: "Deseja excluir este item?" }
    });
    let result = await dialogRef.afterClosed().toPromise();

    // (confirm('Deseja excluir este item?')) 
    
    if (result) {
      try {
        await this.editoraSrv.excluir(id)
        this.ngOnInit() //atualiza os dados da tabela
        this.snackBar.open("Exclusão efetuada com sucesso!", 'Entendi', { //substitui o alert
          duration: 5000
        });
      }
      catch (erro) {
        this.snackBar.open("Não foi possível excluir este item!", 'OK', { //substitui o alert
          duration: 5000
        });
      }
    }
  }
}
