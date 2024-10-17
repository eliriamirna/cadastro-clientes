import { Request, Response } from "express";
import ClienteRepository from "../repositories/cliente-repository";
import Cliente from "../models/cliente";

export default class ClienteController {
    async create(req: Request, res: Response) {
        const { nome, cep, endereco, cidade } = req.body;
        
        try {
            console.log("Initializing ClienteRepository for creating a new cliente");
            const clienteRepository = new ClienteRepository();
            
            console.log("Creating a new Cliente instance");
            const cliente = new Cliente({
                nome,
				cep,
				endereco,
                cidade
			});
			
			console.log("Saving the new cliente to the database");
			const clienteCriado = await clienteRepository.create(cliente);

			console.log("Cliente successfully created");
			return res.status(201).json(clienteCriado);

        } catch (error) {
            console.error("Error occurred while creating cliente:", error);
			return res.status(400).json('Problema ao criar usuário');
        }
    }

    async get(req: Request, res: Response) {
        try {
            console.log("Fetching all clientes from the database");
            const clientesRepository = new ClienteRepository();

            const clientes = await clientesRepository.find();

            console.log("Successfully fetched clientes");
            return res.status(200).json(clientes);
            
        } catch (error) {
            console.error("Error occurred while fetching clientes:", error);
			return res.status(400).json('Problema ao buscar clientes');
        }
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        const { codigo } = req.params;         
        try {
            console.log(`Fetching cliente with codigo: ${codigo}`);
            const clientesRepository = new ClienteRepository();

            const codigoNumber = parseInt(codigo, 10);
          
            if (isNaN(codigoNumber)) {
                console.error("Invalid codigo provided:", codigo);
                return res.status(400).json({ message: 'Código inválido' });
            }
            
            const cliente = await clientesRepository.findByCod(codigoNumber);

            if (!cliente) {
                console.log("Cliente not found");
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            console.log("Cliente found and retrieved successfully");
            return res.status(200).json(cliente);
          
        } catch (error) {
            console.error('Erro ao buscar cliente pelo código:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async update(req: Request, res: Response) {
        const { codigo } = req.params;
        const codigoNumber = Number(codigo);
        const { nome, cep, endereco, cidade } = req.body;
    
        try {
            console.log(`Attempting to update cliente with codigo: ${codigo}`);
            const clienteRepository = new ClienteRepository();
    
            const clienteExistente = await clienteRepository.findByCod(codigoNumber);
    
            if (!clienteExistente) {
                console.log("Cliente not found for updating");
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            console.log("Updating cliente fields");
            clienteExistente.nome = nome !== undefined ? nome : clienteExistente.nome;
            clienteExistente.cep = cep !== undefined ? cep : clienteExistente.cep;
            clienteExistente.endereco = endereco !== undefined ? endereco : clienteExistente.endereco;
            clienteExistente.cidade = cidade !== undefined ? cidade : clienteExistente.cidade;
            
            console.log("Saving updated cliente to the database");
            const clienteAtualizado = await clienteRepository.update(codigo, clienteExistente);
    
            console.log("Cliente updated successfully");
            return res.status(200).json(clienteAtualizado);
    
        } catch (error) {
            console.error("Error occurred while updating cliente:", error);
            return res.status(400).json({ message: 'Problema ao atualizar cliente' });
        }
    }

    async delete(req: Request, res: Response) {
        const { codigo } = req.params; 
        const codigoNumber = Number(codigo); 
    
        try {
            console.log(`Attempting to delete cliente with codigo: ${codigo}`);
            const clienteRepository = new ClienteRepository();
    
            const clienteExistente = await clienteRepository.findByCod(codigoNumber);
    
            if (!clienteExistente) {
                console.log("Cliente not found for deletion");
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
    
            console.log("Deleting cliente from the database");
            await clienteRepository.delete(codigo); 
    
            console.log("Cliente deleted successfully");
            return res.status(204).send(); 
    
        } catch (error) {
            console.error("Error occurred while deleting cliente:", error);
            return res.status(400).json({ message: 'Problema ao excluir cliente' });
        }
    }
}
