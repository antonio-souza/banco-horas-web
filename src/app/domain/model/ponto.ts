import { Funcionario } from './funcionario';
import { Periodo } from './periodo';

export interface Ponto {
    id: number;
    periodo: Periodo;
    funcionario: Funcionario;    
    saldoBanco: string;
    saldoBancoAcumulado: string;
    saldoGreve: string;
    saldoGreveAcumulado: string;
}