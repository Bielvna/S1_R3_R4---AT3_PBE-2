import { Cliente } from "../models/Cliente.js";
import clienteRepository from "../repositories/clienteRepository.js";
import axios from "axios";

const clienteController = {
    criar: async (req, res) => {
        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'Verifique o CEP informado' });
            }

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (respApi.data.erro) {
                return res.status(400).json({ message: 'CEP não encontrado' });
            }

            const cliente = Cliente.criar({
                nome,
                cpf,
                telefone,
                cep,
                numero,
                complemento,
                endereco: respApi.data 
            });

            const result = await clienteRepository.criar(cliente);

            res.status(201).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            const cliente = Cliente.alterar({
                nome,
                cpf,
                telefone,
                cep,
                numero,
                complemento
            }, id);

            const result = await clienteRepository.editar(cliente);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;

            const result = await clienteRepository.deletar(id);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

};

export default clienteController;