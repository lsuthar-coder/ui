import * as React from "react";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    Drawer,
    Button,
    makeStyles,
    tokens,
} from "@fluentui/react-components";
import { getAllCoa } from '../features/coaSlice';
import { CustomTable } from "../components/CustomTable";
import { Input, Label } from "@fluentui/react-components";
import { PatternFormat } from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux'
import { createCoa } from '../features/coaSlice'
import { Dismiss24Regular, AddFilled, SaveRegular } from "@fluentui/react-icons";
const useStyles = makeStyles({
    content: {
        flex: "1",
        padding: "16px",

        display: "grid",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gridRowGap: tokens.spacingVerticalXXL,
        gridAutoRows: "max-content",
    },

    drawer: {
        backgroundColor: "#ffffff",
        boxShadow: "-8px 0 24px rgba(0, 0, 0, 0.18)",
        borderLeft: "1px solid #d1d1d1",
    },
    drawerHeader: {
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #d1d1d1",
    },
    drawerBody: {
        backgroundColor: "#ffffff",
        padding: "24px",
        overflowX: "hidden",
        boxSizing: "border-box",
    },

    field: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalS,
    },
    form: {
        width: "100%",
        minWidth: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    formFields: {
        width: "100%",
        minWidth: 0,
        display: "grid",
        gridTemplateColumns: "100px minmax(0, 1fr)",
        alignItems: "center",
        gap: "16px 12px",
    },
    formActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
    },

    input: {
        border: "1px solid #808080",
        borderRadius: "6px",
        padding: "4px 8px",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
    },

    page: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: "#ffffff",
        overflowX: "hidden",
        padding: "24px",
    },
    primaryButton: {
        borderRadius: "6px",
        padding: "8px 18px",
        backgroundColor: "#0f6cbd",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#115ea3",
        },
    },

    root: {
        border: "2px solid #ccc",
        overflow: "hidden",

        display: "flex",
        height: "480px",
        backgroundColor: "#fff",
    },

    secondaryButton: {
        borderRadius: "6px",
        padding: "8px 18px",
        backgroundColor: "#ffffff",
        color: "#242424",
        border: "1px solid #808080",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    },

    tableWrapper: {
        width: "100%",
        overflowX: "auto",

        "& table": {
            width: "100%",
            borderCollapse: "collapse",
        },
        "& table thead th": {
            color: "#0f6cbd",
            fontWeight: "600",
        },

        "& table tbody tr:nth-child(even)": {
            backgroundColor: "#f5f5f5",
        },

        "& table tbody tr:hover": {
            backgroundColor: "#f5f5f5",
        },
        "& th": {
            color: "#0f6cbd",
            fontWeight: "600",
        },

        "& th, & td": {
            padding: "10px 12px",
            textAlign: "left",
        },

        "& tbody tr:nth-child(even)": {
            backgroundColor: "#f5f5f5",
        },

        "& tbody tr:hover": {
            backgroundColor: "#f5f5f5",
        },

        "& [role='row']:nth-child(even)": {
            backgroundColor: "#f5f5f5",
        },

        "& [role='row']:hover": {
            backgroundColor: "#f5f5f5",
        },
    },
});

export const COA = () => {
    const [name, setName] = React.useState("");
    const [code, setCode] = React.useState("");
    const data = useSelector((state) => state.coa.value);
    const dispatch = useDispatch()
    const styles = useStyles();

    const coaList = useSelector((state) => state.coa.value);

    const [isOpen, setIsOpen] = React.useState(false);
    const submitHandler = () => {
        if (data.some(item => item.Name === name || item.Code === code)) {
            alert("Account with the same name and code already exists.");
            return;
        }
        dispatch(createCoa({ name: name, code: code }))
        setName("");
        setCode("");
    }

    const columns = [
        { columnKey: "sno", label: "S.No" },
        { columnKey: "code", label: "Code" },
        { columnKey: "account", label: "Account" },
        { columnKey: "accounttype", label: "Account Type" },
        { columnKey: "accountgroup", label: "Account Group" },
    ]

    const tabledata = [
        ...coaList.map((item, index) => ({
            idx: `row-${index + 1}`,
            sno: { label: index + 1 },
            code: { label: item.Code },
            account: { label: item.Name },
            accounttype: { label: 'Turnover' },
            accountgroup: { label: 'Cost of accounts' },
        }))
    ]

    const refreshHandler = () => {
        fetch('https://localhost:7117/coa')
            .then(response => response.json())
            .then(data => {
                dispatch(getAllCoa(data));
            })
            .catch(error => console.error("Error fetching COA:", error));
    }


    return (
        <div className={styles.page}>
            <Drawer
                type="overlay"
                separator
                open={isOpen}
                onOpenChange={(_, { open }) => setIsOpen(open)}
                position="end"
                className={styles.drawer}
            >
                <DrawerHeader className={styles.drawerHeader}>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular />}
                                onClick={() => setIsOpen(false)}
                            />
                        }
                    >
                        Add Account
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody className={styles.drawerBody}>
                    <form
                        className={styles.form}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className={styles.formFields}>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />

                            <Label htmlFor="code">Code</Label>
                            <PatternFormat
                                id="code"
                                format="##/##"
                                className={styles.input}
                                placeholder="__/__"
                                mask="_"
                                allowEmptyFormatting
                                onValueChange={(values) => {
                                    setCode(values.formattedValue);
                                }}
                            />
                        </div>

                        <div className={styles.formActions}>
                            <Button
                                type="button"
                                appearance="secondary"
                                className={styles.secondaryButton}
                                onClick={() => {setIsOpen(false); setName(""); setCode("");}}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                appearance="primary"
                                icon={<SaveRegular />}
                                className={styles.primaryButton}
                                onClick={() => {
                                    submitHandler();
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </form>

                </DrawerBody>
            </Drawer>

            <Button
                icon={<AddFilled />}
                className={styles.primaryButton}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Account
            </Button>
            <Button
                className={styles.primaryButton}
                style={{ marginLeft: "8px" }}
                onClick={refreshHandler}
            >
                Refresh
            </Button>

            <div className={styles.tableWrapper}>
                <CustomTable columns={columns} tabledata={tabledata} />
            </div>
        </div>
    );
};