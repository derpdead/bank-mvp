import type { NextPage } from 'next'
import Head from 'next/head'
import {useBankList} from "../src/services/useBankList";
import {Box, Button, Container, Grid, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddBankAccountButton from "../src/components/Buttons/AddBankAccountButton";
import {useMemo} from "react";
import {useBanks} from "../src/services/useBanks";

const Home: NextPage = () => {
    const banks = useBanks();
    const addedBanks = useBankList();

    const accounts = useMemo(() => {
        return addedBanks.map(bank => {
            const countryBanks = banks[bank.countryCode];

            return {
                ...bank,
                bankName: countryBanks.find(({ service }) => service === bank.service).fullname,
            }
        });
    }, [addedBanks, banks]);

    return (
        <>
            <Head>
                <title>Bank - MVP</title>
                <meta name="description" content="MVP project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Bank accounts
                            </Typography>
                            <AddBankAccountButton />
                        </Box>
                        <Box sx={{ pt: 2 }} display={'grid'} gap={'12px'} gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}>
                            {
                                accounts.map((account, index) =>
                                    <Box key={index}>
                                        <Paper sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            backgroundColor: (theme) =>  theme.palette.grey[100],
                                            border: (theme) =>  `1px solid ${theme.palette.grey[300]}`,
                                        }}
                                               elevation={0}>
                                            <Typography component="h4" variant="h6" align="center" color={(theme => theme.palette.secondary.light)}>
                                                {account.bankName}
                                            </Typography>
                                            {/*<Typography sx={{ pt: 1 }} variant="body2" align="center">*/}
                                            {/*    {account.number}*/}
                                            {/*</Typography>*/}
                                            {/*<Typography sx={{ pt: 1 }} variant="subtitle2" align="center">*/}
                                            {/*    {account.amount}*/}
                                            {/*</Typography>*/}
                                        </Paper>
                                    </Box>
                                )
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}

export default Home
