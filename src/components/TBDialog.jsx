import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    makeStyles
} from "@fluentui/react-components";
import { useSelector } from 'react-redux';
import { TBTable } from '../components/TBTable';
import { useEffect, useState } from "react";
const useStyles = makeStyles({
    surface: {
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
    },
    title: {
        fontWeight: "700",
    },
    primaryButton: {
        backgroundColor: "#0f6cbd",
        color: "#ffffff",
        borderRadius: "6px",
        padding: "8px 18px",
        "&:hover": {
            backgroundColor: "#115ea3",
        },
    },

    secondaryButton: {
        backgroundColor: "#ffffff",
        color: "#242424",
        border: "1px solid #8a8886",
        borderRadius: "6px",
        padding: "8px 18px",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    },
});

export const TBDialog = ({ open, id, setidhandler, closeDialogHandler }) => {
    const styles = useStyles();
    const state = useSelector((state) => state.tb.value);
    const data = state.find((item) => item.Id === id);
    const closeHandler = () => {
        setidhandler("")
        closeDialogHandler(false)
    }
    const columns = [
        { columnKey: "code", label: "Code" },
        { columnKey: "name", label: "Name" },
        { columnKey: "debit", label: "Debit" },
        { columnKey: "credit", label: "Credit" },
    ]
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        if (data && data.Entries) {
            setTableData(data.Entries.map((entry, index) => ({
                idx: `row-${index + 1}`,
                name: { label: entry.Name },
                code: { label: entry.AccountCode },
                debit: { label: entry.Debit == 0 ? '-' : `£${entry.Debit}` },
                credit: { label: entry.Credit == 0 ? '-' : `£${entry.Credit}` }
            })))
            setTableData((prev) => [...prev, {
                idx: `row-${prev.length + 1}`,
                name: { label: '' },
                code: { label: '' },
                debit: { label: `£${data?.Entries.reduce((sum, entry) => sum + entry.Debit, 0)}` },
                credit: { label: `£${data?.Entries.reduce((sum, entry) => sum + entry.Credit, 0)}` }
            }])
        }
        console.log(tableData)

    }, [id])

    return <Dialog open={open}>
        <DialogSurface className={styles.surface}>
            <DialogBody>
                <DialogTitle className={styles.title}>Trial balance</DialogTitle>
                <DialogContent>
                    <TBTable columns={columns} tabledata={tableData} />
                </DialogContent>
                <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                        <Button className={styles.secondaryButton} onClick={() => closeHandler()}>Close</Button>
                    </DialogTrigger>
                </DialogActions>
            </DialogBody>
        </DialogSurface>
    </Dialog>
}