import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { UsuarioSessaoService } from "src/app/domain/service/usuario-sessao.service";

@Directive({
    selector: '[visivelSeLogado]'
})
export class VisivelSeLogadoDirective implements OnInit {

    displayAtual: string;

    constructor(
        private elemento: ElementRef<any>,
        private renderer: Renderer2,
        private usuarioSessaoService: UsuarioSessaoService
    ) { }

    ngOnInit(): void {
        this.displayAtual = getComputedStyle(this.elemento.nativeElement).display;

        this.usuarioSessaoService.usuario$.subscribe(usuario => {
            if (usuario) {
                this.renderer.setStyle(this.elemento.nativeElement, 'display', this.displayAtual);
            } else {
                this.displayAtual = getComputedStyle(this.elemento.nativeElement).display;
                this.renderer.setStyle(this.elemento.nativeElement, 'display', 'none');
            }
        });        
    }
}