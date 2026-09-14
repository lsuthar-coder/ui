import * as React from "react";
import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
} from "@fluentui/react-components";

export const CustomTable = ({ columns, tabledata }) => {
    return (
        <Table
            size="small"
            aria-label="Table with small size"
            style={{ minWidth: "475px" }}
        >
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHeaderCell key={column.columnKey}>
                            {column.label}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tabledata.map((item, index) => {
                    const rowKey = item.idx ?? index;

                    return (
                        <TableRow key={rowKey}>
                            {columns.map((column) => {
                                const cellObj = item[column.columnKey];
                                
                                // 2. Direct assignment: Allow strings, numbers, or JSX components
                                const displayValue = cellObj && typeof cellObj === 'object' && 'label' in cellObj
                                    ? cellObj.label 
                                    : "";

                                return (
                                    <TableCell key={`${rowKey}-${column.columnKey}`}>
                                        <TableCellLayout>
                                            {displayValue}
                                        </TableCellLayout>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

