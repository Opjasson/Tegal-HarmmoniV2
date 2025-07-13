import { response } from "express";
import kuliner from "../Model/kulinerModel.js";

export async function getData(req, res) {
    try {
        const response = await kuliner.findAll({
            attributes: [
                "id",
                "nama",
                "deskripsi",
                "img",
                "maps",
                "contact",
                "createdAt",
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

export async function getDataById(req, res) {
    try {
        const data = await kuliner.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

export async function addData(req, res) {
    const { nama, deskripsi, img, maps, contact } = req.body;
    try {
        await kuliner.create({
            nama: nama,
            deskripsi: deskripsi,
            img: img,
            maps: maps,
            contact: contact,
        });
        res.status(201).json({ msg: "Data berhasil ditambahakan!" });
    } catch (error) {
        res.status(400).json({ msg: "Internal server error!" });
    }
}

export const updateKulinerById = async (req, res) => {
    try {
        const { nama, deskripsi, img, maps, contact } = req.body;
        await kuliner.update(
            {
                nama,
                deskripsi,
                img,
                maps,
                contact,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Data berhasil dirubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteKulinerById = async (req, res) => {
    try {
        await kuliner.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Data berhasil dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
