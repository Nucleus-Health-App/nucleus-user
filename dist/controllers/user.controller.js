"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findAll();
    res.status(200).json({
        msg: 'Todos los usuarios',
        users
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findByPk(id);
    res.status(200).json({
        msg: 'Obtener usuario',
        user
    });
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_model_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExists)
            return res.status(400).json({ msg: "Ya existe un usuario con el email " + body.email });
        const user = yield user_model_1.default.create(body);
        res.status(200).json({
            msg: 'Crear usuario',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_model_1.default.findByPk(id);
        if (!user)
            return res.status(404).json({ msg: "No existe usuario con ID: " + id });
        yield user.update(body);
        res.status(200).json({
            msg: 'Actualizar usuario',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findByPk(id);
        if (!user)
            return res.status(404).json({ msg: "No existe usuario con ID: " + id });
        yield user.update({ active: false });
        res.status(200).json({
            msg: 'Eliminar usuario',
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map