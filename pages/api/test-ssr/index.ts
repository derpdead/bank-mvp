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
    res.status(200).json({ message: 'SSR is working'});
}
