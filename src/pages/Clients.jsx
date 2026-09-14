import { CustomTable } from "../components/CustomTable";
import { makeStyles, Text } from "@fluentui/react-components";
const useStyles = makeStyles({
    container: {
        width: "100%",
        minHeight: "100%",
        padding: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "#ffffff",
        overflowX: "hidden",
    },

    heading: {
        color: "#0f6cbd",
        fontWeight: "600",
    },

    tableWrapper: {
        width: "100%",
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

export const Clients = () => {
    const styles = useStyles();

    const columns = [
        { columnKey: "sno", label: "S.No." },
        { columnKey: "clientId", label: "Client ID" },
        { columnKey: "businessName", label: "Business Name" },
        { columnKey: "type", label: "Type" },
        { columnKey: "accountingPeriod", label: "Accounting Period" },
        { columnKey: "dueDate", label: "Due Date" },
        { columnKey: "accountStatus", label: "Account Status" },
    ];

    const tabledata = [
        {
            idx: "row-1",
            sno: { label: 1 },
            clientId: { label: "CL-8921" },
            businessName: { label: "Nova Tech Solutions" },
            type: { label: "LLC" },
            accountingPeriod: { label: "Q1 - 2026" },
            dueDate: { label: "2026-04-15" },
            accountStatus: { label: "Active" }
        },
        {
            idx: "row-2",
            sno: { label: 2 },
            clientId: { label: "CL-4412" },
            businessName: { label: "Apex Global Trading" },
            type: { label: "Corporation" },
            accountingPeriod: { label: "Full Year 2025" },
            dueDate: { label: "2026-03-31" },
            accountStatus: { label: "Pending" }
        },
        {
            idx: "row-3",
            sno: { label: 3 },
            clientId: { label: "CL-3109" },
            businessName: { label: "Summit Retail Group" },
            type: { label: "Partnership" },
            accountingPeriod: { label: "February 2026" },
            dueDate: { label: "2026-03-10" },
            accountStatus: { label: "Overdue" }
        },
        {
            idx: "row-4",
            sno: { label: 4 },
            clientId: { label: "CL-7543" },
            businessName: { label: "Vanguard Logistics" },
            type: { label: "LLC" },
            accountingPeriod: { label: "Q1 - 2026" },
            dueDate: { label: "2026-04-15" },
            accountStatus: { label: "Active" }
        },
        {
            idx: "row-5",
            sno: { label: 5 },
            clientId: { label: "CL-1290" },
            businessName: { label: "Horizon Consultancies" },
            type: { label: "Sole Proprietorship" },
            accountingPeriod: { label: "Q4 - 2025" },
            dueDate: { label: "2026-01-31" },
            accountStatus: { label: "Completed" }
        }
    ];


    return (
        <div className={styles.container}>
            <Text size={400} className={styles.heading}>
                Tax and Accounts
            </Text>

            <div className={styles.tableWrapper}>
                <CustomTable
                    columns={columns}
                    tabledata={tabledata}
                />
            </div>
        </div>
    );
};