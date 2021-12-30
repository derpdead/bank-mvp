import {FC, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import AddBankAccountDialog from "../Dialogs/AddBankAccountDialog";

const AddBankAccountButton: FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant={'contained'}
                size={'small'}
                startIcon={
                    <AddIcon />
                }
                onClick={handleClickOpen}>
                Add bank
            </Button>
            <AddBankAccountDialog open={open} onClose={handleClose} />
        </>
    )
}

export default AddBankAccountButton;
