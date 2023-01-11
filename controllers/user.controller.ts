import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.status(200).json({
        msg: 'Todos los usuarios',
        users
    });
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    res.status(200).json({
        msg: 'Obtener usuario',
        user
    });
}

export const createUser = async  (req: Request, res: Response) => {

    const { body } = req;

    try {

        const emailExists = await User.findOne({
            where: {
                email: body.email
            }
        })

        if (emailExists) return res.status(400).json({msg: "Ya existe un usuario con el email " + body.email});

        const user = await User.create(body);
    
        res.status(200).json({
            msg: 'Crear usuario',
            user
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }

}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);
    
        if (!user) return res.status(404).json({msg: "No existe usuario con ID: " + id});

        await user.update(body);
    
        res.status(200).json({
            msg: 'Actualizar usuario',
            user
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }

}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
    
        if (!user) return res.status(404).json({msg: "No existe usuario con ID: " + id});

        await user.update({ active: false });
    
        res.status(200).json({
            msg: 'Eliminar usuario',
            user
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}