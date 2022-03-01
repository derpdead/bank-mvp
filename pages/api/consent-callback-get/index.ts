import type { NextApiRequest, NextApiResponse } from 'next'
import { graphqlOperation} from "aws-amplify";
import {createBank} from "../../../src/graphql/mutations";
import { withSSRContext } from "aws-amplify";

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

        const SSR = withSSRContext({ req })

        await SSR.API.graphql(graphqlOperation(createBank, {
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
