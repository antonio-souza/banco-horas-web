import { AbstractControl } from '@angular/forms';

export function hora3DigitosComSinalValidator(control: AbstractControl) {    
    if(control.value && control.value.trim() && !/^(\+|\-)([0-9][0-9][0-9]):[0-5][0-9]$/.test(control.value)) {
        return { hora3DigitosComSinal: true }
    }
    return null;
} 