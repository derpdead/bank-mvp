import type { NextApiRequest, NextApiResponse } from 'next'
import {GET_SUPPORTED_BANK_LIST_URL} from "../../../src/defaults/services";
import axios from "../../../src/services/axios";
import {COUNTRY_CODES} from "../../../src/defaults/countries";
import {IBankDTO} from "../../../src/services/useBanks";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const supportedBanks: { [key: string]: Array<IBankDTO>} = {};

        await Promise.all(
            COUNTRY_CODES.map(countryCode => axios.get(GET_SUPPORTED_BANK_LIST_URL, {
                params: {
                    countryCode,
                    showSandbox: 1,
                },
            }).then(response => {
                supportedBanks[countryCode] = response.data
            }))
        )

        res.status(200).json(supportedBanks);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error' });

    }
}
