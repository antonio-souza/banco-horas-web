import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TipoAlerta, Alerta } from "./alerta";
import { Router, NavigationStart } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AlertaService {

    alertaSubject: Subject<Alerta> = new Subject<Alerta>();
    manterAposMudancaRota = false;

    constructor(router: Router) {

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.manterAposMudancaRota) {
                    this.manterAposMudancaRota = false;
                } else {
                    this.limpar();
                }
            }
        });
    }

    enviarSucesso(mensagem: string, manterAposMudancaRota: boolean = true) {
        this.enviarAlerta(TipoAlerta.SUCCESSO, mensagem, manterAposMudancaRota);
    }

    enviarAviso(mensagem: string, manterAposMudancaRota: boolean = true) {
        this.enviarAlerta(TipoAlerta.AVISO, mensagem, manterAposMudancaRota);
    }

    enviarPerigo(mensagem: string, manterAposMudancaRota: boolean = true) {
        this.enviarAlerta(TipoAlerta.PERIGO, mensagem, manterAposMudancaRota);
    }

    enviarInformacao(mensagem: string, manterAposMudancaRota: boolean = true) {
        this.enviarAlerta(TipoAlerta.INFORMACAO, mensagem, manterAposMudancaRota);
    }

    enviarErro(erro: any, nomeServico: string) {
        if (erro.status == 404) {
            console.log(erro);
            this.enviarAlerta(TipoAlerta.PERIGO, `Serviço para ${nomeServico} não encontrado! Por favor, contate o Administrador.`, true);
        } else if (erro.status != 400 && erro.status != 401 && erro.status != 407 && erro.status != 412) {
            console.log(erro);
            this.enviarAlerta(TipoAlerta.PERIGO, `Erro inesperado ao ${nomeServico}! Por favor, contate o Administrador.`, true);
        } else {
            console.log(erro);
            const mensagem = erro.error.cause ? erro.error.cause.message : erro.error.message;
            this.enviarAlerta(TipoAlerta.PERIGO, mensagem, true);
        }
    }

    private enviarAlerta(alertType: TipoAlerta, mensagem: string, manterAposMudancaRota: boolean) {
        this.manterAposMudancaRota = manterAposMudancaRota;
        this.alertaSubject.next(new Alerta(alertType, mensagem));
    }

    getAlerta() {
        return this.alertaSubject.asObservable();
    }

    limpar() {
        this.alertaSubject.next(null);
    }
}

