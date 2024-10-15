import { Request, Response } from 'express';
import ClienteRepository from '../repositories/cliente-repository';
import path from 'path';

export default class UploadController {
    async uploadFile(req: Request, res: Response) {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'Nenhum arquivo enviado' });
            }

            const fileName = file.filename; 
            const filePath = path.join('public/uploads', file.filename);

            const clienteCod = req.body.codigo; 

            const clienteRepository = new ClienteRepository();

            const clienteAtualizado = await clienteRepository.updateFile(clienteCod, fileName, filePath);

            return res.status(200).json({
                message: 'Arquivo enviado com sucesso',
                filePath,
                fileName,
                cliente: clienteAtualizado
            });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao processar o upload de arquivo', error });
        }
    }
}
