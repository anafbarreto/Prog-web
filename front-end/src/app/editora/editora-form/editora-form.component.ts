import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../editora.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';


@Component({
  selector: 'app-editora-form',
  templateUrl: './editora-form.component.html',
  styleUrls: ['./editora-form.component.scss']
})
export class EditoraFormComponent implements OnInit {

  title: string = 'Nova editora'

  editora: any = {} //objeto vazio


  constructor(
    private editoraSrv: EditoraService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params   // Capturando os parâmetros da rota
    if (params['id']) {        // Existe um parâmetro chamado id?

      // Para atualizar é necesário consultar o back-end
      // e recuperar o registro para edição

      try {
        this.editora = await this.editoraSrv.obterUm(params['id'])
        this.title = 'Atualizar editora'
      }
      catch (erro) {
        this.snackBar.open(erro.message, 'Erro!', { duration: 5000 })
      }
    }
  }

  async voltar(form: NgForm) {
    let result = true;
    console.log(form);

    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)

    if (form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });
      result = await dialogRef.afterClosed().toPromise();
    }
    if (result) {
      this.router.navigate(['/editora']); // Retorna à listagem
    }
  }

async salvar(form: NgForm) {

  // Salvar se o form for válido
  if (form.valid) {
    try {
      let msg = 'Editora atualizada com sucesso!'

      // Se existir o campo ID= ATUALIZAÇÃO

      if (this.editora._id) {
        await this.editoraSrv.atualizar(this.editora)
      }
      
      // Senão = GERAR NOVA EDITORA

      else {
        await this.editoraSrv.novo(this.editora)
        msg = 'Editora criada com sucesso!'
      }

      // Dá o feedback para o usuário

      this.snackBar.open(msg, 'Entendi', { duration: 5000 })

      // Voltar à listagem

      this.router.navigate(['/editora'])
    }
    catch (erro) {
      this.snackBar.open(erro.message, 'Erro!', { duration: 5000 })
    }
  }
}
}