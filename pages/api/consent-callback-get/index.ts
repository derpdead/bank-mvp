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

        return res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
}
