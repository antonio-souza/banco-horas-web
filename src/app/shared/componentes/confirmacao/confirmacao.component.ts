import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {

  titulo: string;
  mensagem: string;
  pergunta: string;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void { 
    this.titulo = this.titulo ? this.titulo : 'Confirmação';
    this.mensagem = this.mensagem ? this.mensagem : '';
    this.pergunta = this.pergunta ? this.pergunta : 'Confirma a operação?';
  }
}
