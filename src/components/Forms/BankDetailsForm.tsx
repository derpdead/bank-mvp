import {FC, useMemo} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {useBanks} from "../../services/useBanks";
import {SUPPORTED_COUNTRIES} from "../../defaults/countries";
import Image from 'next/image';

interface IBankDetailsFormProps {
    countryCode: string;
    service: string;
    onValueChange: (value: string, key: string) => void;
}

const BankDetailsForm: FC<IBankDetailsFormProps> = ({
    countryCode,
    service,
    onValueChange,
}) => {
    const banks = useBanks();
    const countryCodes = useMemo(() => Object.keys(banks), [banks]);

    const handleChange = (event: SelectChangeEvent) => {
        onValueChange(event.target.value, event.target.name);
    };

    return (
        <Grid container spacing={3} sx={{pt: 1}}>
            <Grid item xs={12}>
                <FormControl fullWidth required>
                    <InputLabel id="countryCodeLabel">Country</InputLabel>
                    <Select
                        value={countryCode}
                        required
                        id="countryCode"
                        labelId="countryCodeLabel"
                        name="countryCode"
                        label="Country"
                        fullWidth
                        onChange={handleChange}>
                        {
                            countryCodes.map(countryCode =>
                                <MenuItem
                                    key={countryCode}
                                    value={countryCode}>
                                    {SUPPORTED_COUNTRIES[countryCode]}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth required>
                    <InputLabel id="serviceLabel">Bank name</InputLabel>
                    <Select
                        value={service}
                        id="service"
                        labelId="serviceLabel"
                        name="service"
                        label="Bank name"
                        disabled={!countryCode}
                        fullWidth
                        onChange={handleChange}>
                        {
                            (banks[countryCode] || []).map(bank =>
                                <MenuItem
                                    key={bank.service}
                                    value={bank.service}>
                                    <Stack direction={'row'} alignItems={'center'}>
                                        <Image
                                            src={bank.imageSVG}
                                            width={40}
                                            height={40} />
                                            {bank.fullname}
                                    </Stack>
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default BankDetailsForm;
