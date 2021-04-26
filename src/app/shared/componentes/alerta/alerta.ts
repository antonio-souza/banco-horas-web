export class Alerta {
    constructor(
        public readonly tipo: TipoAlerta, 
        public readonly mensagem: string
    ) {}
}

export enum TipoAlerta {
    SUCCESSO,
    AVISO, 
    PERIGO, 
    INFORMACAO
}