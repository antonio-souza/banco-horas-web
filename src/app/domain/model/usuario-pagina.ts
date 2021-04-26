import { Usuario } from './usuario';

export interface UsuarioPagina {
    usuarios: Usuario[];
    pagina: number;
    tamanho: number;
    total: number;
}