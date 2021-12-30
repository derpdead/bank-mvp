import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
    Box, Button,
    Container,
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {GetStaticPaths, GetStaticProps} from "next";
import axios from "axios";
import {GET_BANK_ACCOUNT_URL} from "../../../../src/defaults/services";
import {API, graphqlOperation} from "aws-amplify";
import {getBank} from "../../../../src/graphql/queries";

const Product: FC = ({ bank }) => {
    const [isError, setIsError] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const {
        isFallback,
        query,
        back,
    } = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(query);
                const formData = new FormData();

                formData.append('servicekey', process.env.SERVICE_API_KEY);
                formData.append('service', bank.service);
                formData.append('user', bank.username);
                formData.append('pass', bank.password);
                formData.append('products', query._product);
                formData.append('startdate', '01-01-2000');

                const result = await axios.post(GET_BANK_ACCOUNT_URL, formData);

                const product = result.data.find(service => service.product === query._product)

                if (product) {
                    setTransactions(product.transactions);
                }
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
                We could not fetch any data for given credentials and product
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
                            Transactions
                        </Typography>
                        <Button
                            variant={'contained'}
                            size={'small'}
                            onClick={handleClickBack}>
                            Back
                        </Button>
                    </Box>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Date 2</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell align="right">Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => (
                                <TableRow key={row.transactionId}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.date2}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell align="right">{`$${row.balance}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

export default Product;
