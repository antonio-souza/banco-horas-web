export interface Perfil {
    codigo: number;
    nome: string;
}

export enum PerfilEnum {
    ADMINISTRADOR = 1,
    GERENTE = 2,
    CHEFFE = 3,
    FUNCIONARIO = 4
}