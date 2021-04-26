import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MensagemComponent],
  exports: [MensagemComponent]
})
export class MensagemModule { }
