import { connection } from "../config/Database.js";

const clienteRepository = {

    criar: async (cliente) => { 
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'INSERT INTO clientes (Nome, Cpf, DataCad) VALUES (?,?,NOW())';
            const values = [cliente.nome, cliente.cpf];

            const [result] = await conn.execute(sql, values);

            await conn.commit();
            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editar: async (cliente) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE clientes SET Nome=?, Cpf=? WHERE Id=?';
            const values = [cliente.nome, cliente.cpf, cliente.id];

            const [result] = await conn.execute(sql, values);

            await conn.commit();
            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'DELETE FROM clientes WHERE Id=?';
            const [result] = await conn.execute(sql, [id]);

            await conn.commit();
            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    criarEndereco: async (endereco) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sql = `
                INSERT INTO enderecos 
                (Cep, Numero, Complemento, IdCliente) 
                VALUES (?,?,?,?)
            `;
            const values = [
                endereco.cep,
                endereco.numero,
                endereco.complemento,
                endereco.idCliente
            ];

            const [result] = await conn.execute(sql, values);

            await conn.commit();
            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    criarTelefone: async (telefone) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sql = `
                INSERT INTO telefones 
                (Telefone, IdCliente) 
                VALUES (?,?)
            `;
            const values = [
                telefone.telefone,
                telefone.idCliente
            ];

            const [result] = await conn.execute(sql, values);

            await conn.commit();
            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

};

export default clienteRepository;