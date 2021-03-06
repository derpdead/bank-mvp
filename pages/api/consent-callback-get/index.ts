import type { NextApiRequest, NextApiResponse } from 'next'
import { graphqlOperation} from "aws-amplify";
import {createBank} from "../../../src/graphql/mutations";
import { withSSRContext } from "aws-amplify";

type ResponseData = {
    result: string
    reason: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const { token } = req.body;
        const { service, cognitoId, countryCode } = req.query;

        const SSR = withSSRContext({ req })

        await SSR.API.graphql(graphqlOperation(createBank, {
            input: {
                cognitoId,
                countryCode,
                service,
                token,
            },
        }));

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        return res.status(200).json({
            result: "OK",
            reason: "Datos recibidos correctamente por el callback del cliente"
        })
    } catch (e) {
        return res.status(500);
    }
}
