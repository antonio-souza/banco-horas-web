import { Setor } from './setor';

export interface Funcionario {
    id: number;
    matricula: string;
    nome: string;
    setor: Setor;
}