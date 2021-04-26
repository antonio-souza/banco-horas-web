import { ValidatorFn, FormGroup } from '@angular/forms';

export const senhaAtualObrigatoriaValidator: ValidatorFn = (formGroup: FormGroup) => {
    return existeErro(formGroup) ? { senhaAtualObrigatoria: true } : null;
}

function existeErro(formGroup: FormGroup) {
    var senhaAtual = formGroup.get('senhaAtual').value;
    var matriculaExistente = formGroup.get('matriculaExistente').value;
    var senhaAtualExistente = formGroup.get('senhaAtualExistente').value;

    return matriculaExistente != '' && senhaAtualExistente != '' && senhaAtual === '';
}