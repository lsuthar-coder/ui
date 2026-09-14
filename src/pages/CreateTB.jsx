import {
    Dropdown,
    makeStyles,
    Text,
    Option,
    Input,
    Button,
    tokens,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TableCellLayout
} from "@fluentui/react-components";
import { createTb } from '../features/tbSlice'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteRegular } from "@fluentui/react-icons";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles({
    page: {
        width: "100%",
        minHeight: "100%",
        padding: "24px",
        boxSizing: "border-box",
        backgroundColor: tokens.colorNeutralBackground1,
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    heading: {
        color: tokens.colorBrandForeground1,
        fontWeight: "600",
        marginBottom: "6px",
    },
    table: {
        width: "100%",
        minWidth: "680px",
        marginTop: "16px",
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        overflow: "hidden",
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow2
    },
    tableHeader: {
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground1,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        fontSize: "11px",
        padding: "12px"
    },
    tableCell: {
        padding: "10px 12px",
        verticalAlign: "middle"
    },
    control: {
        width: "100%",
        minWidth: "130px",
        fontSize: "14px"
    },
    numberControl: {
        width: "100%",
        minWidth: "110px",
        fontSize: "14px",
        "& input": {
            textAlign: "right"
        }
    },
    newRow: {
        backgroundColor: tokens.colorBrandBackground2,
        borderTop: `1px solid ${tokens.colorBrandStroke1}`,
    },
    indexNumber: {
        fontWeight: "600",
        textAlign: "center",
        color: tokens.colorNeutralForeground3
    },
    actionButton: {
        display: "flex",
        justifyContent: "center"
    },
    summaryLabel: {
        fontWeight: "600",
        textAlign: "right"
    },
    summaryValue: {
        fontWeight: "600"
    },
    balanced: {
        color: tokens.colorPaletteGreenForeground1,
        fontWeight: "600"
    },
    unbalanced: {
        color: tokens.colorPaletteRedForeground1,
        fontWeight: "600"
    },
    summaryContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
        marginTop: "8px",
        paddingRight: "2cm"
    },
    summaryRow: {
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        minWidth: "220px"
    },
    createBtn: {
        backgroundColor: "#2886de",
        width: "3cm",
        color: "white",
        borderRadius: "20px",
        padding: "10px 20px",
        marginTop: "16px",
        ":hover": {
            backgroundColor: "#1e6bb3",
            color: "white"
        }
    }
});

export const CreateTB = () => {
    const styles = useStyles();
    const coas = useSelector((state) => state.coa.value) || [];
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const [newRow, setNewRow] = useState({ coa: "", Debit: "", Credit: "" });
    const newRowAccountRef = useRef(null);
    const shouldFocusNewRow = useRef(false);
    const totalDebit = data.reduce((sum, item) => sum + (Number(item.Debit) || 0), 0);
    const totalCredit = data.reduce((sum, item) => sum + (Number(item.Credit) || 0), 0);
    const debitTotal = Number(totalDebit.toFixed(2));
    const creditTotal = Number(totalCredit.toFixed(2));
    const diff = Number((debitTotal - creditTotal).toFixed(2));
    const formatAmount = (amount) => amount.toFixed(2);

    useEffect(() => {
        if (!shouldFocusNewRow.current) {
            return;
        }

        shouldFocusNewRow.current = false;
        requestAnimationFrame(() => newRowAccountRef.current?.focus());
    }, [data.length]);

    const handleUpdateRow = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        setData(updated);
    };

    const handleNewRowInteraction = (field, value) => {
        const updatedNewRow = { ...newRow, [field]: value };

        if (updatedNewRow.coa && (updatedNewRow.Debit !== "" || updatedNewRow.Credit !== "")) {
            shouldFocusNewRow.current = true;
            setData([...data, updatedNewRow]);
            setNewRow({ coa: "", Debit: "", Credit: "" });
        } else {
            setNewRow(updatedNewRow);
        }
    };

    const handleRemoveRow = (indexToRemove) => {
        setData(data.filter((_, index) => index !== indexToRemove));
    };

    const createHandler = () => {
        const finalData = [...data];
        if (newRow.coa && (newRow.Debit || newRow.Credit)) {
            finalData.push(newRow);
        }
        console.log(data)
        if (finalData.length != 0)
            dispatch(createTb({ data: data }))

        setData([]);
        setNewRow({ coa: "", Debit: "", Credit: "" });
    };

    return (
        <div className={styles.page}>
            <Text size={600} className={styles.heading}>
                Create Trial Balance
            </Text>

            <Table className={styles.table} aria-label="Trial balance inputs">
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell className={styles.tableHeader}>Line. No</TableHeaderCell>
                        <TableHeaderCell className={styles.tableHeader}>Account</TableHeaderCell>
                        <TableHeaderCell className={styles.tableHeader}>Debit</TableHeaderCell>
                        <TableHeaderCell className={styles.tableHeader}>Credit</TableHeaderCell>
                        <TableHeaderCell className={styles.tableHeader}>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(data) && data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className={styles.tableCell}>
                                <TableCellLayout className={styles.indexNumber}>{index + 1}</TableCellLayout>
                            </TableCell>

                            <TableCell className={styles.tableCell}>
                                <Dropdown
                                    appearance="outline"
                                    className={styles.dropdown}
                                    placeholder="Select account"
                                    value={item.coa}
                                    onOptionSelect={(_, d) => handleUpdateRow(index, "coa", d.optionValue)}
                                >
                                    {coas.map((coa) => (
                                        <Option key={`${coa.Name}-${coa.Code}`} value={`${coa.Name}-${coa.Code}`} style={{

                                            height: "40px",
                                        }}>
                                            {coa.Name} - {coa.Code}
                                        </Option>
                                    ))}
                                </Dropdown>
                            </TableCell>

                            <TableCell className={styles.tableCell}>
                                <Input
                                    appearance="outline"
                                    className={styles.numberControl}
                                    type="number"
                                    placeholder="0.00"
                                    value={item.Debit}
                                    onChange={(e) => handleUpdateRow(index, "Debit", e.target.value)}
                                />
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <Input
                                    appearance="outline"
                                    className={styles.numberControl}
                                    type="number"
                                    placeholder="0.00"
                                    value={item.Credit}
                                    onChange={(e) => handleUpdateRow(index, "Credit", e.target.value)}
                                />
                            </TableCell>

                            <TableCell className={styles.tableCell}>
                                <div className={styles.actionButton}>
                                    <Button
                                        appearance="subtle"
                                        icon={<DeleteRegular />}
                                        onClick={() => handleRemoveRow(index)}
                                        title="Remove row"
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow className={styles.newRow}>
                        <TableCell className={styles.tableCell}>
                            <TableCellLayout className={styles.indexNumber}>{data.length + 1}</TableCellLayout>
                        </TableCell>

                        <TableCell className={styles.tableCell}>
                            <Dropdown
                                ref={newRowAccountRef}
                                appearance="outline"
                                className={styles.dropdown}
                                placeholder="Select account"
                                value={newRow.coa}
                                onOptionSelect={(_, d) => handleNewRowInteraction("coa", d.optionValue)}
                            >
                                {coas.map((coa) => (
                                    <Option key={`${coa.Name}-${coa.Code}`} value={`${coa.Name}-${coa.Code}`} style={{
                                        height: "40px",
                                    }}>
                                        {coa.Name} - {coa.Code}
                                    </Option>
                                ))}
                            </Dropdown>
                        </TableCell>

                        <TableCell className={styles.tableCell}>
                            <Input
                                appearance="outline"
                                className={styles.numberControl}
                                type="number"
                                placeholder="0.00"
                                value={newRow.Debit}
                                onChange={(e) => handleNewRowInteraction("Debit", e.target.value)}
                            />
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <Input
                                appearance="outline"
                                className={styles.numberControl}
                                type="number"
                                placeholder="0.00"
                                value={newRow.Credit}
                                onChange={(e) => handleNewRowInteraction("Credit", e.target.value)}
                            />
                        </TableCell>
                        <TableCell />
                    </TableRow>

                </TableBody>
            </Table>

            <div className={styles.summaryContainer}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total debit:</span>
                    <span className={styles.summaryValue}>{formatAmount(debitTotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total credit:</span>
                    <span className={styles.summaryValue}>{formatAmount(creditTotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Status:</span>
                    <span className={diff === 0 ? styles.balanced : styles.unbalanced}>
                        {diff === 0 ? "Balanced" : `${diff > 0 ? "Debit" : "Credit"} ${formatAmount(Math.abs(diff))}`}
                    </span>
                </div>
            </div>

            <Button onClick={createHandler} className={styles.createBtn}>Create</Button>
        </div>
    );
};
