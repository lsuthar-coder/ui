import * as React from "react";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    Button,
    makeStyles,
    Dropdown,
    Option,
    useId,
    Field,
    Radio,
    RadioGroup,
    OverlayDrawer
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../components/CustomTable";
import { DialogComponent } from "../components/DialogComponent";
import { Dismiss24Regular, AddFilled } from "@fluentui/react-icons";
import { useSelector } from 'react-redux';
import { EditFilled } from '@fluentui/react-icons';
const useStyles = makeStyles({
    page: {
        width: "100%",
        minHeight: "100%",
        padding: "24px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        overflowX: "hidden",
    },

    drawer: {
        backgroundColor: "#ffffff",
        boxShadow: "-8px 0 24px rgba(0, 0, 0, 0.18)",
        borderLeft: "1px solid #d1d1d1",
        width: "500px",
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

    form: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    formFields: {
        display: "grid",
        gridTemplateColumns: "120px minmax(0, 1fr)",
        alignItems: "center",
        gap: "20px 12px",
    },

    field: {
        display: "contents",

        "& .fui-Field__label": {
            display: "inline-flex",
            alignItems: "center",
            width: "auto",
            margin: 0,
            fontWeight: "600",
            color: "#242424",
        },
    },

    formLabel: {
        display: "inline-flex",
        alignItems: "center",
        width: "auto",
        margin: 0,
        fontWeight: "600",
        color: "#242424",
    },

    radioGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },

    radio: {
        display: "inline-flex",
        alignItems: "center",

        "& .fui-Radio__label": {
            display: "inline-flex",
            alignItems: "center",
            color: "#242424",
        },

        "& .fui-Radio__indicator": {
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: "2px solid #808080",
            backgroundColor: "#ffffff",
        },

        "& input:checked + .fui-Radio__indicator": {
            borderTopColor: "#0f6cbd",
            borderRightColor: "#0f6cbd",
            borderBottomColor: "#0f6cbd",
            borderLeftColor: "#0f6cbd",
            backgroundColor: "#0f6cbd",
        },

        "& input:checked + .fui-Radio__indicator::after": {
            content: '""',
            display: "block",
            width: "6px",
            height: "6px",
            margin: "4px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
        },
    },

    dropdown: {
        width: "100%",
        minHeight: "40px",
        border: "1px solid #808080",
        borderRadius: "6px",
        backgroundColor: "#ffffff !important",
        color: "#242424",

        "& .fui-Dropdown__button": {
            width: "100%",
            minHeight: "40px",
            backgroundColor: "#ffffff !important",
            border: "0",
            borderRadius: "6px",
            color: "#242424",
        },

        "&:hover .fui-Dropdown__button": {
            backgroundColor: "#ffffff !important",
        },

        "&:focus-within": {
            borderTopColor: "#0f6cbd",
            borderRightColor: "#0f6cbd",
            borderBottomColor: "#0f6cbd",
            borderLeftColor: "#0f6cbd",
        },
    },

    formActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
    },

    primaryButton: {
        borderRadius: "6px",
        padding: "8px 18px",
        backgroundColor: "#0f6cbd !important",
        color: "#ffffff !important",

        "&:hover": {
            backgroundColor: "#115ea3 !important",
        },
    },

    secondaryButton: {
        borderRadius: "6px",
        padding: "8px 18px",
        backgroundColor: "#ffffff !important",
        color: "#242424 !important",
        border: "1px solid #808080 !important",

        "&:hover": {
            backgroundColor: "#f5f5f5 !important",
        },
    },

    tableWrapper: {
        width: "100%",
        marginTop: "24px",
        overflowX: "auto",

        "& table": {
            width: "100%",
            borderCollapse: "collapse",
        },

        "& th, & td": {
            padding: "10px 12px",
            textAlign: "left",
        },

        "& th": {
            color: "#0f6cbd",
            fontWeight: "600",
        },

        "& tbody tr:nth-child(even), & [role='row']:nth-child(even)": {
            backgroundColor: "#f5f5f5",
        },

        "& tbody tr:hover, & [role='row']:hover": {
            backgroundColor: "#f5f5f5",
        },
    },
});
import { TBDialog } from "../components/TBDialog";
export const TB = () => {
    const styles = useStyles();
    const tbList = useSelector((state) => state.tb.value);

    const navigate = useNavigate();
    const dropdownId = useId("dropdown-default");
    const options = [
        '(02/04/2026 - 31/03/2027)',
        '(02/04/2026 - 01/04/2027)',
        '(02/04/2027 - 01/04/2028)'
    ];

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [isDialogTwoOpen, setIsDialogTwoOpen] = React.useState(false);
    const [id, setId] = React.useState("")
    const submitHandler = (e) => {
        e.preventDefault();
    }
    const columns = [
        { columnKey: "sno", label: "S.No" },
        { columnKey: "refno", label: "Ref. No" },
        { columnKey: "turnover", label: "Turnover" },
        { columnKey: "status", label: "Status" },
        { columnKey: "edit", label: "Edit" },
    ]
    const tabledata = [
        ...tbList.map((item, index) => {
            let balanced = 0 == item.Entries.reduce((sum, entry) => sum + entry.Debit - entry.Credit, 0);
            return {
                idx: `row-${index + 1}`,
                sno: { label: index + 1 },
                refno: { label: <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setId(item.Id); setIsDialogTwoOpen(true) }}> TB - {index + 1}</span > },
                turnover: { label: balanced ? item.Entries.reduce((sum, entry) => sum + entry.Debit, 0) : '-' },
                status: { label: balanced ? <span style={{ color: "white", backgroundColor: "green", padding: "4px 8px", borderRadius: "4px" }}>Balanced</span> : <span style={{ color: "white", backgroundColor: "red", padding: "4px 8px", borderRadius: "4px" }}>Unbalanced</span> },
                edit: {
                    label: (
                        <Button
                            appearance="subtle"
                            aria-label="Edit"
                            icon={
                                <EditFilled
                                    onClick={() => navigate(`/tbedit/${item.Id}/${index + 1}`)}
                                />
                            }
                        />
                    )
                },
            }
        })
    ]

    // const dialog2Handler = () => {
    //     setId('');
    //     setDialogOpen2(false);
    // }

    return (
        <div className={styles.page}>
            <TBDialog open={isDialogTwoOpen} id={id} closeDialogHandler={setIsDialogTwoOpen} setidhandler={setId} />
            <OverlayDrawer
                type="overlay"
                separator
                open={isDrawerOpen}
                onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
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
                                onClick={() => setIsDrawerOpen(false)}
                            />
                        }
                    >
                        New Trial Balance
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody className={styles.drawerBody}>
                    <form className={styles.form} onSubmit={submitHandler}>
                        <div className={styles.formFields}>
                            <Field label="Type" className={styles.field}>
                                <RadioGroup
                                    defaultValue="statutory"
                                    disabled
                                    className={styles.radioGroup}
                                    layout="horizontal"
                                >
                                    <Radio
                                        value="statutory"
                                        label="Statutory"
                                        className={styles.radio}
                                    />
                                    <Radio
                                        value="management"
                                        label="Management"
                                        className={styles.radio}
                                    />
                                </RadioGroup>
                            </Field>

                            <label htmlFor={dropdownId} className={styles.formLabel}>Period</label>

                            <Dropdown 
                                id={dropdownId}
                                appearance="outline"
                                placeholder="Select period"
                                defaultValue={options[0]}
                                className={styles.dropdown}
                            >
                                {options.map((option) => (
                                    <Option key={option} disabled={option === options[2]} style={{
                                        color: option === options[2] ? "#808080" : "#242424",
                                        backgroundColor: option === options[2] ? "#f5f5f5" : "#ffffff",
                                        height: "40px",
                                    }}>
                                        {option}
                                    </Option>
                                ))}
                            </Dropdown>

                            <Field label="Mode of import" className={styles.field}>
                                <RadioGroup
                                    defaultValue="manual"
                                    disabled
                                    className={styles.radioGroup}
                                    layout="horizontal"
                                >
                                    <Radio value="csv" label="CSV" className={styles.radio} />
                                    <Radio
                                        value="bookkeeping"
                                        label="Bookkeeping"
                                        className={styles.radio}
                                    />
                                    <Radio value="manual" label="Manual" className={styles.radio} />
                                </RadioGroup>
                            </Field>
                        </div>

                        <div className={styles.formActions}>
                            <Button
                                type="button"
                                appearance="secondary"
                                className={styles.secondaryButton}
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                Cancel
                            </Button>

                            <DialogComponent
                                dialogHeading="Confirmation"
                                dialogContent="A report for the selected period already exists."
                                open={isDialogOpen}
                                setOpen={setDialogOpen}
                                dialogHandler={() => navigate("/tbcreate")}
                            />
                        </div>
                    </form>
                </DrawerBody>
            </OverlayDrawer>

            <Button
                icon={<AddFilled />}
                className={styles.primaryButton}
                onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
                Trial Balance
            </Button>

            <div className={styles.tableWrapper}>
                <CustomTable columns={columns} tabledata={tabledata} />
            </div>
        </div>
    );
};