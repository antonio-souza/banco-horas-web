import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioDTO } from 'src/app/domain/dto/usuario-dto';
import { Usuario } from 'src/app/domain/model/usuario';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css']
})
export class UsuarioFormularioComponent implements OnInit {

  usuario: Usuario;
  form: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id: [this.usuario.id],
        senha: [this.usuario.senha]
      }
    );
  }

  get formControls() {
    return this.form.controls;
  }

  limparSenha() {
    this.formControls.senha.setValue('');
  }

  gravar() {
    const usuarioDTO = this.form.getRawValue() as UsuarioDTO;
    this.modal.close(usuarioDTO);
  }
}
