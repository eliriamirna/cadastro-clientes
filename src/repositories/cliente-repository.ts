import pool from "../conexaoBd";
import TCliente from "../tipos/TCliente";

type TUpdateCliente = {
    readonly codigo?: number;
    nome: string;
    cep: string;
    endereco: string;
    cidade: string ;
}

export default class ClienteRepository {
    async create(props: TCliente) {
        const query = `
            insert into clientes (nome, cep, endereco, cidade)
            values ($1, $2, $3, $4)
            returning codigo, nome, cep, endereco, cidade
            `;

        const resultado = await pool.query(query, [props.nome, props.cep, props.endereco, props.cidade]);
        const clienteCriado = resultado.rows[0];
        return clienteCriado;        
    }

    async updateFile(codigo: number, fileName: string, filePath: string) {
        const query = `
            UPDATE clientes 
            SET file_name = $1, file_path = $2 
            WHERE codigo = $3 
            RETURNING codigo, file_name, file_path
        `;

        const resultado = await pool.query(query, [fileName, filePath, codigo]);
        const clienteAtualizado = resultado.rows[0];
        return clienteAtualizado;
    }

    async find() {
        const query = 'select * from clientes'
        const { rows } = await pool.query(query)
        return rows
    }

    async findByCod(codigo: number) {
        const query = `select * from clientes where codigo = $1`;
        const  { rows } = await pool.query(query, [codigo])
        return rows[0]
    }

    async update(codigo: string, props: TUpdateCliente) {
        const query = `update clientes 
        set nome = $1, 
        cep = $2, 
        endereco = $3, 
        cidade = $4 
        where codigo = $5
        returning codigo, nome, cep, endereco, cidade`
        const resultado = await pool.query(query, [props.nome, props.cep, props.endereco, props.cidade, codigo])
        const clienteAtualizado = resultado.rows[0];
        return clienteAtualizado;
    }

    async delete(codigo: string) {
        const query = 'delete from clientes where codigo = $1;'
        const { rows } = await pool.query(query, [codigo])
        return rows[0]
        
    }

}