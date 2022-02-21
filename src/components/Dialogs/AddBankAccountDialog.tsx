import {FC, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Step, StepLabel,
    Stepper
} from "@mui/material";
import BankDetailsForm from "../Forms/BankDetailsForm";
import BankCredentialsForm from "../Forms/BankCredentialsForm";
import axios from "axios";
import {GET_BANK_ACCOUNT_URL} from "../../defaults/services";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createBank} from "../../graphql/mutations";
import {mutate} from "swr";

interface IAddBankAccountDialogProps {
    open: boolean;
    onClose: () => void;
}

const steps = ['Bank details', 'Credentials'];

const AddBankAccountDialog: FC<IAddBankAccountDialogProps> = ({
    open,
    onClose,
}) => {
    const [data, setData] = useState({
        countryCode: '',
        service: '',
        username: '',
        password: '',
    });
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async () => {
        if (activeStep + 1 > steps.length - 1) {
            try {
                const user = await Auth.currentUserInfo();

                await API.graphql(graphqlOperation(createBank, {
                    input: {
                        cognitoId: user.id,
                        countryCode: data.countryCode,
                        service: data.service,
                        username: data.username,
                        password: data.password,
                        accountId: '',
                    },
                }))

                await mutate('bankList');

                onClose();
            } catch (e) {
                console.error(e);
            }
        } else {
            // setActiveStep(activeStep + 1);

            try {
                const response = await axios.post('/api/consent-get', {
                    service: data.service,
                    redirectTo: window.location.href,
                });

                global.open(response.data.follow, '_new');

                // onClose();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onValueChange = (value: string, key: string) => {
        setData((prevState => ({
            ...prevState,
            [key]: value,
        })))
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <BankDetailsForm
                    countryCode={data.countryCode}
                    service={data.service}
                    onValueChange={onValueChange} />;
            case 1:
                return <BankCredentialsForm
                    username={data.username}
                    password={data.password}
                    onValueChange={onValueChange} />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'sm'} onClose={onClose}>
            <DialogTitle>Login via bank</DialogTitle>
            <DialogContent>
                {/*<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>*/}
                {/*    {steps.map((label) => (*/}
                {/*        <Step key={label}>*/}
                {/*            <StepLabel>{label}</StepLabel>*/}
                {/*        </Step>*/}
                {/*    ))}*/}
                {/*</Stepper>*/}
                {/*{getStepContent(activeStep)}*/}
                <BankDetailsForm
                    countryCode={data.countryCode}
                    service={data.service}
                    onValueChange={onValueChange} />
            </DialogContent>
            <DialogActions sx={{ pr: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/*{activeStep !== 0 && (*/}
                    {/*    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>*/}
                    {/*        Back*/}
                    {/*    </Button>*/}
                    {/*)}*/}
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    onClick={handleNext}*/}
                    {/*    sx={{ mt: 3, ml: 1 }}*/}
                    {/*>*/}
                    {/*    {activeStep === steps.length - 1 ? 'Add' : 'Next'}*/}
                    {/*</Button>*/}
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {'Login'}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default AddBankAccountDialog;
