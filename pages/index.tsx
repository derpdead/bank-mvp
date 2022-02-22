import type { NextPage } from 'next'
import Head from 'next/head'
import {useBankList} from "../src/services/useBankList";
import {Box, Button, Container, Grid, Link, Paper, Typography} from "@mui/material";
import AddBankAccountButton from "../src/components/Buttons/AddBankAccountButton";
import {useMemo} from "react";
import {useBanks} from "../src/services/useBanks";
import NextLink from 'next/link'
import {COUNTRY_CODES, SUPPORTED_COUNTRIES} from "../src/defaults/countries";

const Home: NextPage = () => {
    const banks = useBanks();
    const addedBanks = useBankList();

    const accounts = useMemo(() => {
        if (Object.keys(banks).length === 0) {
            return [];
        }

        return addedBanks
            .filter(bank => typeof banks[bank.countryCode] !== 'undefined')
            .map(bank => {
                const countryBanks = banks[bank.countryCode];

                const supportedBank = countryBanks.find(({ service }) => service === bank.service) || {};

                return {
                    ...bank,
                    bank: supportedBank,
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
                                accounts.map(account =>
                                    <NextLink href={`/service/${account.id}`} key={account.id} prefetch={false}>
                                        <Link>
                                            <Box>
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
                                                        {account.bank.fullname}
                                                    </Typography>
                                                    <Typography sx={{ pt: 1 }} variant="body2" align="center">
                                                        {SUPPORTED_COUNTRIES[account.bank.countryCode]}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                                        </Link>
                                    </NextLink>
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
