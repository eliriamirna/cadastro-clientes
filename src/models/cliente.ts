import TCliente from "../tipos/TCliente";

export default class Cliente {
	readonly codigo?: number
	nome?: string
	cep?: string
	endereco?: string
	cidade?: string
	file_name?: string;
    file_path?: string;

	constructor(props: TCliente){
		this.nome = props.nome
		this.cep = props.cep
		this.endereco = props.endereco
		this.cidade = props.cidade
		this.file_name = props.file_name
		this.file_path = props.file_path
	}
}