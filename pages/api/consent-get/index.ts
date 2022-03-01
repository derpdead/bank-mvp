import type { NextApiRequest, NextApiResponse } from 'next'
import {GET_BANK_ACCOUNT_URL, POST_CONSENT_GET} from "../../../src/defaults/services";
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

        const { service, redirectTo, cognitoId, countryCode } = req.body;

        formData.append('servicekey', 'l0vz1obtyaxlpfwl');
        formData.append('service', service);
        formData.append('grantType', 'read');
        formData.append('validUntil', '15-05-2022');
        formData.append('urlRedirect', redirectTo);
        formData.append('yourConsentCallback', `${redirectTo}api/consent-callback-get?service=${service}&cognitoId=${cognitoId}&countryCode=${countryCode}`);

        const result = await axios.post(POST_CONSENT_GET, formData, {
            headers: formData.getHeaders()
        });

        res.status(200).json(result.data);
    } catch (e) {
        console.log('ERROR', e);
        res.status(500).json({ message: 'Error' });
    }
}
