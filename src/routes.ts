import { Router } from "express";
import upload from './midlewares/multerConfig';

import ClienteController from "./controllers/cliente-controller";
import UploadController from "./controllers/upload-controller";

const routes = Router()

// @ts-ignore
routes.post('/clientes', new ClienteController().create)

// @ts-ignore
routes.get('/clientes', new ClienteController().get)

// @ts-ignore
routes.get('/clientes/:codigo', new ClienteController().getOne)

// @ts-ignore
routes.put('/clientes/:codigo', new ClienteController().update)

// @ts-ignore
routes.delete('/clientes/:codigo', new ClienteController().delete)

// @ts-ignore
routes.post('/upload', upload.single('file'), new UploadController().uploadFile);

export default routes