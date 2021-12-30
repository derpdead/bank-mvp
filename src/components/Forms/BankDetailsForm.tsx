import {FC} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useBanks} from "../../services/useBanks";
import {COUNTRY_CODES, SUPPORTED_COUNTRIES} from "../../defaults/countries";

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

    const handleChange = (event: SelectChangeEvent) => {
        onValueChange(event.target.value, event.target.name);
    };

    return (
        <Grid container spacing={3}>
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
                            COUNTRY_CODES.map(countryCode =>
                                <MenuItem
                                    key={countryCode}
                                    value={countryCode}>
                                    { SUPPORTED_COUNTRIES[countryCode] }
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
                                    { bank.fullname }
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
