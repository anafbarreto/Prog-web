import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditoraListComponent } from './editora/editora-list/editora-list.component'
import { EditoraFormComponent } from './editora/editora-form/editora-form.component';


const routes: Routes = [
  {
    path: 'editora', //no angular não usa barra (/) antes do nome da rota
    component: EditoraListComponent
  },
  {
    path: 'editora/novo', //criar novo fornecedor
    component: EditoraFormComponent
  },
  {
    path: 'editora/:id', //atualizar um fornecedor existente
    component: EditoraFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
