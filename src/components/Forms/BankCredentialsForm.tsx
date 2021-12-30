import {ChangeEvent, FC, SyntheticEvent} from "react";
import {FormControl, Grid, InputLabel, SelectChangeEvent, TextField} from "@mui/material";

interface IBankCredentialsFormProps {
    username: string;
    password: string;
    onValueChange: (value: string, key: string) => void;
}

const BankCredentialsForm: FC<IBankCredentialsFormProps> = ({
    username,
    password,
    onValueChange,
}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onValueChange(event.target.value, event.target.name);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    value={username}
                    required
                    id="username"
                    name="username"
                    label="Username"
                    type={'username'}
                    fullWidth
                    onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={password}
                    required
                    id="password"
                    type={'password'}
                    name="password"
                    label="Password"
                    fullWidth
                    onChange={handleChange} />
            </Grid>
        </Grid>
    )
}

export default BankCredentialsForm;
