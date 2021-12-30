import useSWRImmutable from 'swr/immutable';
import {API, graphqlOperation} from "aws-amplify";
import {listBanks} from "../graphql/queries";

export const useBankList = () => {
    const {
        data = [],
    } = useSWRImmutable('bankList', async () => {
        const result = await API.graphql(graphqlOperation(listBanks));

        return result.data.listBanks.items;
    });

    return data;
}
