import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ponto } from 'src/app/domain/model/ponto';
import { hora3DigitosComSinalValidator } from 'src/app/shared/validators/hora-3-digitos-com-sinal.validator';
import { PontoDTO } from '../../../domain/dto/ponto-dto';

@Component({
  selector: 'app-saldo-formulario',
  templateUrl: './saldo-formulario.component.html',
  styleUrls: ['./saldo-formulario.component.css']
})
export class SaldoFormularioComponent implements OnInit {
  
  ponto: Ponto;
  form: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.ponto.id],
      saldoBanco: [this.ponto.saldoBanco, hora3DigitosComSinalValidator], 
      saldoGreve: [this.ponto.saldoGreve, hora3DigitosComSinalValidator]
    });
  }

  get formControls() {
    return this.form.controls;
  }

  montarHora3DigitosComSinal(elemento: any) {
    var valor = elemento.value as string;
    var tamanho = valor.length;

    if (tamanho == 4) {
      elemento.value = elemento.value + ":";
      return null;
    }
    return true;
  }

  gravar() {
    const saldoPontoDTO = this.form.getRawValue() as PontoDTO;
    this.modal.close(saldoPontoDTO);
  }
}
