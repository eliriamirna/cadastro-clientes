import { Request, Response } from "express";
import ClienteRepository from "../repositories/cliente-repository";
import Cliente from "../models/cliente";

export default class ClienteController {
    async create(req: Request, res: Response) {
        const { nome, cep, endereco, cidade } = req.body
        
        try {
            const clienteRepository = new ClienteRepository()
            
            const cliente = new Cliente({
                nome,
				cep,
				endereco,
                cidade
			})
			
			const clienteCriado = await clienteRepository.create(cliente)

			return res.status(201).json(clienteCriado)

        } catch (error) {
			return res.status(400).json('Problema ao criar usuário')
        }
    }

    async get(req: Request, res: Response) {
        try {
            const clientesRepository = new ClienteRepository()

            const clientes = await clientesRepository.find()

            return res.status(200).json(clientes)
            
        } catch (error) {
			return res.status(400).json('Problema ao buscar clientes') 
        }
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        const { codigo } = req.params;         
        try {
            const clientesRepository = new ClienteRepository()

            const codigoNumber = parseInt(codigo, 10);
          
            if (isNaN(codigoNumber)) {
            return res.status(400).json({ message: 'Código inválido' });
            }
            
            const cliente = await clientesRepository.findByCod(codigoNumber);

            if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            return res.status(200).json(cliente);
          
        } catch (error) {
          console.error('Erro ao buscar cliente pelo código:', error);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async update(req: Request, res: Response) {
        const { codigo } = req.params;
        const codigoNumber = Number(codigo)
        const { nome, cep, endereco, cidade } = req.body;
    
        try {
            const clienteRepository = new ClienteRepository();
    
            const clienteExistente = await clienteRepository.findByCod(codigoNumber);
    
            if (!clienteExistente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
           
    
            clienteExistente.nome = nome !== undefined ? nome : clienteExistente.nome;
            clienteExistente.cep = cep !== undefined ? cep : clienteExistente.cep;
            clienteExistente.endereco = endereco !== undefined ? endereco : clienteExistente.endereco;
            clienteExistente.cidade = cidade !== undefined ? cidade : clienteExistente.cidade;
            
            const clienteAtualizado = await clienteRepository.update(codigo, clienteExistente);
    
            return res.status(200).json(clienteAtualizado);
    
        } catch (error) {
            return res.status(400).json({ message: 'Problema ao atualizar cliente' });
        }
    }

    async delete(req: Request, res: Response) {
        const { codigo } = req.params; 
        const codigoNumber = Number(codigo); 
    
        try {
            const clienteRepository = new ClienteRepository();
    
            const clienteExistente = await clienteRepository.findByCod(codigoNumber);
    
            if (!clienteExistente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            await clienteRepository.delete(codigo); 
    
            return res.status(204).send(); 
    
        } catch (error) {
            return res.status(400).json({ message: 'Problema ao excluir cliente' });
        }
    }
    
    
}