import { AppError } from "../utils/appError.js";

const users = [];

const getUsers = (req, res) => {
    res.json(users);
}

const addUser = (req, res) => {
    try {
        const { nombre, email } = req.body;

        if (!nombre || !email) {
            throw new AppError('Faltan campos obligatorios', 400);
        }
        const user = {
            nombre: nombre,
            email: email
        }
        users.push(user);
        res.json(user);
    } catch (error) {
        throw new AppError('Ocurrió un error al agregar al usuario.', 500);
    }
}

const deleteUser = (req, res) => {
    try {
        const { index } = req.params;

        if (index >= 0 && index < users.length) {
            const deleteUser = users.splice(index, 1);
            res.json(user);
        } else {
            throw new AppError('Usuario no encontrado.', 404);
        }
    } catch (error) {
        throw new AppError('Ocurrió un error al eliminar al usuario.', 500);
    }
}

export { getUsers, addUser, deleteUser }