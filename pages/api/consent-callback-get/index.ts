import type { NextApiRequest, NextApiResponse } from 'next'
import {API, graphqlOperation} from "aws-amplify";
import {createBank} from "../../../src/graphql/mutations";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const { token } = req.body;
        const { service, cognitoId, countryCode } = req.query;

        await API.graphql(graphqlOperation(createBank, {
            input: {
                cognitoId,
                countryCode,
                service,
                token,
            },
        }));

        res.status(200);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error' });
    }
}
