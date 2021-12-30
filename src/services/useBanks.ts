import useSWRImmutable from 'swr/immutable';
import axios from "axios";
import {COUNTRY_CODES} from "../defaults/countries";
import {GET_BANK_LIST_URL} from "../defaults/services";

export const useBanks = () => {
    const {
        data = {},
    } = useSWRImmutable('banks', async () => {
        const response = await axios.get(GET_BANK_LIST_URL);
        const supportedBanks = response.data.filter(bank => COUNTRY_CODES.some(countryCode => bank.country_code === countryCode));

        return supportedBanks.reduce((prev, curr) => ({
            ...prev,
            [curr.country_code]: [
                ...prev[curr.country_code] || [],
                curr,
            ]
        }), {});
    });

    return data;
}
