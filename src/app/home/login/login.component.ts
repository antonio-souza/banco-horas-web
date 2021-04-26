import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/domain/service/usuario.service';
import { AlertaService } from 'src/app/shared/componentes/alerta/alerta.service';
import { IpService } from 'src/app/shared/service/ip.service';
import { PlataformaService } from 'src/app/shared/service/plataforma.service';
import { numeroValidator } from 'src/app/shared/validators/numero.validator';
import { UsuarioSessaoService } from '../../domain/service/usuario-sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ultimaUrl: string;
  ip: string;
  form: FormGroup;
  @ViewChild('matriculaRef') matriculaRef: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private plataformaService: PlataformaService,
    private usuarioSessaoService: UsuarioSessaoService,
    private alertaService: AlertaService,
    private ipService: IpService
  ) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => this.ultimaUrl = params['ultimaUrl']);

    this.form = this.formBuilder.group({
      matricula: ['',
        [
          Validators.required,
          numeroValidator,
          Validators.minLength(5),
          Validators.maxLength(5)
        ]
      ],
      senha: ['', Validators.required]
    });

    this.ipService.getIp()
      .subscribe((res:any) => this.ip = res.ip);
  }

  get formControls() {
    return this.form.controls;
  }

  login() {
    const matricula = this.formControls.matricula.value;
    const senha = this.formControls.senha.value;

    this.usuarioService.autenticar(matricula, senha, this.ip)
      .subscribe(
        usuario => {          
          this.usuarioSessaoService.gravar(usuario, this.ip);
          this.alertaService.enviarInformacao(`Bem vindo ao Banco de Horas, ${usuario.nome}!`);
          //this.router.navigate(['ponto']);
          this.ultimaUrl
            ? this.router.navigateByUrl(this.ultimaUrl)
            : this.router.navigate(['saldo']);
        },
        erro => {
          console.log(erro);
          //this.loginForm.reset();
          if (this.plataformaService.isNavegador()) {
            this.matriculaRef.nativeElement.focus();
          }
          this.alertaService.enviarErro(erro, 'efetuar login');
        }
      );
  }
}
