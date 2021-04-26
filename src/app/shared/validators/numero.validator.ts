import { AbstractControl } from '@angular/forms';

export function numeroValidator(control: AbstractControl) {   
    
    if(control.value && control.value.trim() && !/^[0-9_\-]+$/.test(control.value)) {
        return { numero: true }
    }
    return null;
} 