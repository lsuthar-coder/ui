import { IconButton } from '@fluentui/react/lib/Button';
import { Stack } from "@fluentui/react"
import { DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react/lib/DetailsList';
import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTb } from '../features/tbSlice';
const dropdownStyles = {
    dropdown: { width: 'calc(100% - 12px)', marginTop: '8px' },
    title: { borderRadius: 4 },
};
const inputStyles = {
    root: { width: '100%' },
    fieldGroup: { width: 'calc(100% - 12px)', marginTop: '8px', borderRadius: 4 },
};
const actionButtonStyles = {
    root: {
        width: 32,
        minWidth: 32,
        height: 32,
        padding: 0,
        borderRadius: 4,
    },
    rootHovered: {
        borderRadius: 4,
    },
};
const submitContainerStyles = {
    root: {
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 12,
    },
};
const submitButtonStyles = {
    root: {
        width: '3cm',
    },
};
const tableContainerStyles = {
    root: {
        width: '100%',
        minWidth: 0,
    },
};

export const CustomInputTable = () => {
    const [data, setData] = React.useState([{ account: '', debit: '', credit: '' }]);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const columns = [
        { key: 'lno', name: 'Line no', fieldName: 'lno', minWidth: 45, maxWidth: 60 },
        { key: 'account', name: 'Account', fieldName: 'account', minWidth: 180, maxWidth: 280 },
        { key: 'debit', name: 'Debit', fieldName: 'debit', minWidth: 100, maxWidth: 150 },
        { key: 'credit', name: 'Credit', fieldName: 'credit', minWidth: 100, maxWidth: 150 },
        { key: 'btn', name: '', fieldName: 'btn', minWidth: 48, maxWidth: 56 },
    ];
    const coaList = useSelector((state) => state.coa.value);

    const options = (Array.isArray(coaList) ? coaList : []).map((coa, idx) => {
        return {
            key: `${coa.name}-${coa.code}`,
            text: `${coa.name}-${coa.code}`
        }
    })

    const insertRowHandler = () => {
        setData((currentData) => [...currentData, { account: '', debit: '', credit: '' }]);
    };

    const rowDeleteHandler = (idx) => {
        setData((currentData) => currentData.filter((_row, rowIndex) => rowIndex !== idx));
    };

    const updateRow = (idx, field, value) => {
        setData((currentData) => currentData.map((rowData, rowIndex) => (
            rowIndex === idx ? { ...rowData, [field]: value } : rowData
        )));
    };

    const tableRows = data.map((rowData, idx) => ({
        key: `input-row-${idx + 1}`,
        lno: idx + 1,
        account: <Dropdown
            placeholder="Select"
            styles={dropdownStyles}
            options={options}
            selectedKey={rowData.account || undefined}
            onChange={(_event, option) => updateRow(idx, 'account', option?.key ?? '')}
        />,
        debit: <TextField
            type="number"
            styles={inputStyles}
            value={rowData.debit}
            onChange={(_event, value) => updateRow(idx, 'debit', value || '')}
        />,
        credit: <TextField
            type="number"
            styles={inputStyles}
            value={rowData.credit}
            onChange={(_event, value) => updateRow(idx, 'credit', value || '')}
        />,
        btn: idx === data.length - 1
            ? <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" styles={actionButtonStyles} onClick={insertRowHandler} />
            : <IconButton iconProps={{ iconName: 'Delete' }} title="Remove" ariaLabel="Remove" styles={actionButtonStyles} onClick={() => rowDeleteHandler(idx)} />
    }));

    const submitHandler = () => {
        const hasMissingAccount = data.some((row) => row.account === '');
        if (hasMissingAccount) {
            alert('Please select an account for every row before submitting.');
            return;
        }

        dispatch(createTb({ data: data }))
        setData([{ account: '', debit: '', credit: '' }]);
        navigate('/tax/clients');
    }

    return <Stack styles={tableContainerStyles}>
        <DetailsList
            compact={false}
            columns={columns}
            items={tableRows}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selectionMode={SelectionMode.none}
        />
        <Stack styles={submitContainerStyles}>
            <PrimaryButton
                text="Submit"
                onClick={submitHandler}
                styles={submitButtonStyles}
                allowDisabledFocus
            />
        </Stack>
    </Stack>
}