import { Perfil } from './perfil';
import { Setor } from './setor';

export class Usuario {
    id: number;
    matricula: string;
    nome: string;
    setor: Setor;
    senha: string;
    perfil: Perfil;
    ip: string;
    token: string;
}