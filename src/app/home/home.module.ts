import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MensagemModule } from '../shared/componentes/mensagem/mensagem.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MensagemModule
  ],
  declarations: [
    LoginComponent, 
    CadastroComponent, 
    HomeComponent
  ]
})
export class HomeModule { }
