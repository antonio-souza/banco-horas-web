import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { AlertaService } from "./alerta.service";
import { Alerta, TipoAlerta } from "./alerta";


@Component({
    selector: 'app-alerta',
    templateUrl: './alerta.component.html'
})
export class AlertaComponent {

    @Input() timeout = 3000;
    alertas: Alerta[] = [];

    constructor(private alertaService: AlertaService) {

        this.alertaService
            .getAlerta()
            .subscribe(alerta => {
                if(!alerta) {
                    this.alertas = [];
                    return;
                }
                this.alertas.push(alerta);
                setTimeout(() => this.removerAlerta(alerta), this.timeout);
            })
    }

    removerAlerta(alertaParaRemover: Alerta) {
        this.alertas = this.alertas.filter(alerta => alerta != alertaParaRemover);
    }

    getClasseAlerta(alerta: Alerta) {

        if(!alerta) return '';

        switch (alerta.tipo) {
            case TipoAlerta.PERIGO:
                return 'alert alert-danger';
            case TipoAlerta.INFORMACAO:
                return 'alert alert-info';
            case TipoAlerta.SUCCESSO:
                return 'alert alert-success';
            case TipoAlerta.AVISO:
                return 'alert alert-warning';
        }
    }
}