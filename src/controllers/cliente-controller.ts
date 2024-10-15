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
           
    
            clienteExistente.nome = nome || clienteExistente.nome;
            clienteExistente.cep = cep || clienteExistente.cep;
            clienteExistente.endereco = endereco || clienteExistente.endereco;
            clienteExistente.cidade = cidade || clienteExistente.cidade;
            
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