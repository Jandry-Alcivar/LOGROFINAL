//Controller tipo de usuario
import { TypeUsersModel } from "../models/TypeUsersModel.js";
import { Op } from "sequelize";

export const getTypeUsers = async (req, res) => {
  try {
    const types = await TypeUsersModel.findAll({ where: { state: true } });
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTypeUsers = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) {
      res.status(400).json({ message: "type is required" });
    }
    const types = await TypeUsersModel.create(req.body);
    res.status(201).json({ message: "create", types });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateTypeUsers = async (req, res) => {
  if (!req.body.type) {
    res.status(400).json({ message: "type is required" });
  }
  const type = await TypeUsersModel.findOne({ where: { id: req.params.id } });
  if (type) {
    type.set(req.body);
    await type.save();
    res.status(200).json({ message: "update" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};
export const deleteTypeUsers = async (req, res) => {
  const type = await TypeUsersModel.findOne({ where: { id: req.params.id } });
  if (type) {
    type.set({ ...type, state: false });
    await type.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};

export const obtenerUsuariosAlfabeticamente = async (req, res) => {
  try {
    // Obtener todos los usuarios ordenados por el campo 'name' en orden ascendente (alfabético)
    const usuarios = await TypeUsersModel.findAll({
      order: [['type', 'ASC']],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    // Buscar usuarios cuyo nombre empieza con 'T'
    const usuarios = await TypeUsersModel.findAll({
      where: {
        type: {
          [Op.like]: 't%' // Busca nombres que comienzan con 'T'
        }
      },
      order: [['type', 'ASC']], // Opcional: Ordenar alfabéticamente
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error); // Para depuración
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};


