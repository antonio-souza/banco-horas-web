import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioCadastro } from 'src/app/domain/model/usuario.cadastro';
import { UsuarioSessaoService } from 'src/app/domain/service/usuario-sessao.service';
import { UsuarioService } from 'src/app/domain/service/usuario.service';
import { IpService } from 'src/app/shared/service/ip.service';
import { PlataformaService } from 'src/app/shared/service/plataforma.service';
import { numeroValidator } from 'src/app/shared/validators/numero.validator';
import { AlertaService } from '../../shared/componentes/alerta/alerta.service';
import { senhaAtualObrigatoriaValidator } from './senha-atual-obrigatoria.validator';
import { senhaAtualProibidaValidator } from './senha-atual-proibida.validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  ip: string;
  form: FormGroup;
  @ViewChild('matriculaRef') matriculaRef: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private plataformaService: PlataformaService,
    private usuarioSessaoService: UsuarioSessaoService,
    private alertaService: AlertaService,
    private ipService: IpService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      matricula: ['', [ Validators.required, numeroValidator, Validators.minLength(5) ] ],
      senhaAtual: [''],
      senhaNova: ['', Validators.required],
      senhaNovaConfirmacao: ['', Validators.required],

      matriculaExistente: ['', Validators.required],
      senhaAtualExistente: ['']
    },
    { validator: [ senhaAtualObrigatoriaValidator, senhaAtualProibidaValidator ] }
    );

    this.ipService.getIp()
      .subscribe((res: any) => this.ip = res.ip);
  }

  verificarMatricula(elemento: any) {
    var matricula = elemento.value as string;

    if (!matricula || matricula.length != 5) {
      this.formControls.matriculaExistente.setValue('');
      this.formControls.senhaAtualExistente.setValue(''); 

    } else {
      this.usuarioService.consultar(matricula).subscribe(usuario => {
        this.formControls.matriculaExistente.setValue(usuario ? 'sim' : '');
        this.formControls.senhaAtualExistente.setValue(usuario && usuario.senha ? 'sim' : '');
      });
    }
  }

  get formControls() {
    return this.form.controls;
  }

  cadastrar() {
    const usuarioCadastro: UsuarioCadastro = {
      matricula: this.formControls.matricula.value,
      senhaAtual: this.formControls.senhaAtual.value,
      senhaNova: this.formControls.senhaNova.value,
      senhaNovaConfirmacao: this.formControls.senhaNovaConfirmacao.value,
      ip: this.ip
    };

    this.usuarioService.cadastrar(usuarioCadastro)
      .subscribe(
        usuarioGravado => {
          this.usuarioSessaoService.gravar(usuarioGravado, this.ip);
          this.alertaService.enviarInformacao('Senha cadastrada com sucesso!');
          this.router.navigate(['saldo']);
        },
        erro => {
          console.log(erro);
          if (this.plataformaService.isNavegador()) {
            this.matriculaRef.nativeElement.focus();
          }
          this.alertaService.enviarErro(erro, 'cadastrar senha');
        }
      );
  }
}
