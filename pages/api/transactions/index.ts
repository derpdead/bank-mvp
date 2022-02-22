import type { NextApiRequest, NextApiResponse } from 'next'
import {POST_TRANSACTIONS} from "../../../src/defaults/services";
import axios from "axios";
const FormData = require('form-data');

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const formData = new FormData();

        const { service, token } = req.body.bank;

        formData.append('servicekey', 'l0vz1obtyaxlpfwl');
        formData.append('service', service);
        formData.append('token', token);
        formData.append('products', req.body.products ? req.body.products : 'GLOBAL');
        formData.append('startDate', req.body.startDate);

        const result = await axios.post(POST_TRANSACTIONS, formData, {
            headers: formData.getHeaders()
        });

        res.status(200).json(result.data);
    } catch (e) {
        console.log('ERROR', e);
        res.status(500).json({ message: 'Error' });
    }
}
