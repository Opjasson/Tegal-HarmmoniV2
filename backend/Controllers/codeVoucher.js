import codeVoucher from "../Model/codeVoucher.js";

export const getAllVouchers = async (req, res) => {
    try {
        const response = await codeVoucher.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const createVoucher = async (req, res) => {
    const response = await codeVoucher.findAll();

    if (response.length >= 4) {
      return res.status(400).json({ msg: "Promo telah habis!" });
    }

    try {
        const { code } = req.body;
        await codeVoucher.create({
            code,
        });
        res.status(200).json({ msg: "Code voucher berhasil dibuat!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
