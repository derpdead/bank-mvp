import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {API, graphqlOperation} from "aws-amplify";

import axios from "axios";
import {Box, Button, Container, Grid, Link, Paper, Typography} from "@mui/material";

import NextLink from "next/link";
import AddBankAccountButton from "../../../src/components/Buttons/AddBankAccountButton";
import {getBank} from "../../../src/graphql/queries";
import {GET_BANK_ACCOUNT_URL} from "../../../src/defaults/services";

const Service: FC = ({ bank }) => {
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const {
        isFallback,
        query,
        back,
    } = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();

                formData.append('servicekey', process.env.SERVICE_API_KEY);
                formData.append('service', bank.service);
                formData.append('user', bank.username);
                formData.append('pass', bank.password);
                formData.append('products', 'GLOBAL');

                const result = await axios.post(GET_BANK_ACCOUNT_URL, formData, {
                    withCredentials: false,
                });

                setProducts(result.data);
            } catch (e) {
                setIsError(true);
            }
        }

        if (!isFallback) {
            fetchData();
        }
    }, [isFallback]);


    if (isFallback) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                We could not fetch any data for given credentials
            </div>
        )
    }

    const handleClickBack = () => {
        back();
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Products
                        </Typography>
                        <Button
                            variant={'contained'}
                            size={'small'}
                            onClick={handleClickBack}>
                            Back
                        </Button>
                    </Box>
                    <Box sx={{ pt: 2 }} display={'grid'} gap={'12px'} gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}>
                        {
                            products.map(product =>
                                <NextLink href={`/service/${query._service}/product/${product.product}`} key={product.product}>
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
                                                    {product.product}
                                                </Typography>
                                                <Typography sx={{ pt: 1 }} variant="body2" align="center">
                                                    {product.description}
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
    )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async() => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async(ctx) => {
    try {
        const { data } = await API.graphql(graphqlOperation(getBank, { id: ctx.params._service }));

        return {
            props: {
                bank: data.getBank,
            }
        }
    } catch (e) {
        console.log('Error', e);
        return  {
            notFound: true,
        }
    }
}

export default Service;
