import { Ponto } from './ponto';

export interface PontoPagina {
    pontos: Ponto[];
    pagina: number;
    tamanho: number;
    total: number;
}