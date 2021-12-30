import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import {AmplifyProvider, withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useBanks} from "../src/services/useBanks";

Amplify.configure({...awsconfig, ssr: true });

function MyApp({ Component, pageProps, signOut, user }: AppProps) {
    useBanks();

    const onClick = async () => {
        await signOut();
    }

    return (
        <AmplifyProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <AppBar position={'absolute'}>
                    <Toolbar>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <Button
                            variant={'text'}
                            color={'inherit'}
                            onClick={onClick}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}>
                    <Toolbar />
                    <Component {...pageProps} />
                </Box>
            </Box>
        </AmplifyProvider>
    )
}

export default withAuthenticator(MyApp)
