import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appVermelhoHover]'
})
export class VermelhoHoverDirective { 

    @Input() cor = 'red';

    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) {}

    @HostListener('mouseover')
    darkenOn() {
        this.render.setStyle(this.el.nativeElement, 'color', this.cor);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setStyle(this.el.nativeElement, 'color', 'black');
    }
}