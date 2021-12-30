import useSWRImmutable from 'swr/immutable';
import {API, Auth, graphqlOperation} from "aws-amplify";
import {listBanks} from "../graphql/queries";

export const useBankList = () => {
    const {
        data = [],
    } = useSWRImmutable('bankList', async () => {
        const user = await Auth.currentUserInfo();

        const result = await API.graphql(graphqlOperation(listBanks, {
            filter: {
                cognitoId: {
                    eq: user.id,
                }
            }
        }));

        return result.data.listBanks.items;
    });

    return data;
}
