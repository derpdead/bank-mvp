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
    TableRow, TextField,
    Typography
} from "@mui/material";
import {GetStaticPaths, GetStaticProps} from "next";
import {API, graphqlOperation} from "aws-amplify";
import {getBank} from "../../../../src/graphql/queries";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {format} from "date-fns";
import axios from "../../../../src/services/axios";

const initStartDate = new Date('01-01-2000');

const Product: FC = ({ bank }) => {
    const [startDate, setStartDate] = useState(initStartDate);
    const [shouldRefresh, setShouldRefresh] = useState(true);
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
                const result = await axios.post('/api/transactions', {bank, products: query._product, startDate: format(startDate, 'dd-MM-yyyy')});

                if (Array.isArray(result.data) && result.data.length) {
                    setTransactions(result.data);
                }

                setShouldRefresh(false);
            } catch (e) {
                setIsError(true);
                setShouldRefresh(false);
            }
        }

        if (!isFallback && shouldRefresh) {
            fetchData();
        }
    }, [isFallback, shouldRefresh]);

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

    const handleClickRefresh = () => {
        setShouldRefresh(true);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Transactions
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <MobileDatePicker
                                    label="Start date"
                                    value={startDate}
                                    onChange={(newValue) => {
                                        setStartDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField size={'small'} {...params} />}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ pr: 2, display: 'flex' }}>
                                <Button
                                    variant={'contained'}
                                    size={'small'}
                                    onClick={handleClickRefresh}>
                                    Refresh
                                </Button>
                            </Box>
                            <Button
                                variant={'contained'}
                                size={'small'}
                                onClick={handleClickBack}>
                                Back
                            </Button>
                        </Box>
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
                            {transactions.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.date2}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell align="right">{`${row.currency} ${row.balance}`}</TableCell>
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
