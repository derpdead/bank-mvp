import type { NextApiRequest, NextApiResponse } from 'next'
import {GET_BANK_ACCOUNT_URL} from "../../../src/defaults/services";
import axios from "axios";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const FormData = require('form-data');

        const formData = new FormData();

        formData.append('servicekey', 'l0vz1obtyaxlpfwl');
        formData.append('service', req.body.bank.service);
        formData.append('user', req.body.bank.username);
        formData.append('pass', req.body.bank.password);
        formData.append('products', req.body.products ? req.body.products : 'GLOBAL');

        if (req.body.startdate) {
            formData.append('startdate', req.body.startdate);
        }

        const result = await axios.post(GET_BANK_ACCOUNT_URL, formData, {
            headers: formData.getHeaders()
        });

        res.status(200).json(result.data);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error' });

    }
}
