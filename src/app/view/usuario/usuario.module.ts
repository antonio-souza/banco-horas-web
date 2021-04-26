import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PesquisaModule } from 'src/app/shared/componentes/pesquisa/pesquisa.module';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { UsuarioTabelaComponent } from './usuario-tabela/usuario-tabela.component';



@NgModule({
  declarations: [
    UsuarioTabelaComponent, 
    UsuarioFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbPaginationModule,
    PesquisaModule
  ]
})
export class UsuarioModule { }
