import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-pesquisa',
    templateUrl: './pesquisa.component.html'
})
export class PesquisaComponent implements OnInit {

    @Output() aoPesquisar = new EventEmitter<string>();
    @Input() valor: string = '';
    pesquisaForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.pesquisaForm = this.formBuilder.group({
            valor: [this.valor, Validators.required]
        });
    }

    pesquisar() {
        this.valor = this.pesquisaForm.get('valor').value;
        //console.log('emitiu valor:' + this.valor);
        this.aoPesquisar.emit(this.valor);
    }
}