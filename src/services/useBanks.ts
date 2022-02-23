import useSWRImmutable from 'swr/immutable';
import axios from "axios";

export interface IBankDTO {
    countryCode: string;
    fullname: string;
    image: string;
    imageSVG: string;
    paymentsSupported: string;
    service: string;
    swift: string;
}

export const useBanks = () => {
    const {
        data,
    } = useSWRImmutable('banks', async () => axios.get<Array<IBankDTO>>('/api/listOfSupportedBanks').then(response => response.data));

    return data;
}
