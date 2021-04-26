import { AbstractControl } from '@angular/forms';

export function horaComSinalValidator(control: AbstractControl) {    
    if(control.value && control.value.trim() && !/^(\+|\-)(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(control.value)) {
        return { horaComSinal: true }
    }
    return null;
} 