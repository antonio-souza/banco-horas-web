import { AbstractControl } from '@angular/forms';

export function caixaBaixaValidator(control: AbstractControl) {

    if(control.value && control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { caixaBaixa: true }
    }
    return null;
} 