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
        { columnKey: "file", label: "File" },
        { columnKey: "author", label: "Author" },
        { columnKey: "lastUpdated", label: "Last updated" },
        { columnKey: "lastUpdate", label: "Last update" },
    ];

    const tabledata = [
        {
            idx: "row-1",
            file: { label: "Meeting notes" },
            author: { label: "Max Mustermann" },
            lastUpdated: { label: "7h ago" },
            lastUpdate: { label: "You edited this" },
        },
        {
            idx: "row-2",
            file: { label: "Thursday presentation" },
            author: { label: "Erika Mustermann" },
            lastUpdated: { label: "Yesterday at 1:45 PM" },
            lastUpdate: { label: "You recently opened this" },
        },
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