import { ItemVendaListComponent } from './item-venda/item-venda-list/item-venda-list.component';
import { VendaFormComponent } from './venda/venda-form/venda-form.component';
import { EditoraFormComponent } from './editora/editora-form/editora-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditoraListComponent } from './editora/editora-list/editora-list.component';
import { VendaListComponent } from './venda/venda-list/venda-list.component';
import { ItemVendaFormComponent } from './item-venda/item-venda-form/item-venda-form.component';
const routes: Routes = [
{
path: 'editora', // No Angular, não se usa / no começo
component: EditoraListComponent
},
{
path: 'editora/novo', // Cadastrar nova editora
component: EditoraFormComponent
},
{
path: 'editora/:id', // Editar uma editora já existente
component: EditoraFormComponent
},
{
path: 'venda',
component: VendaListComponent
},
{
path: 'venda/novo',
component: VendaFormComponent
},
{
path: 'venda/:id',
component: VendaFormComponent
},
{
path: 'item-venda',
component: ItemVendaListComponent
},
{
path: 'item-venda/novo',
component: ItemVendaFormComponent
},
{
path: 'item-venda/novo/:venda',
component: ItemVendaFormComponent
},
{
path: 'item-venda/:id',
component: ItemVendaFormComponent
}
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
