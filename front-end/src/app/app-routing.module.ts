import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditoraListComponent } from './editora/editora-list/editora-list.component'


const routes: Routes = [
  {
    path: 'editora', //no angular não usa barra (/) antes do nome da rota
    component: EditoraListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
