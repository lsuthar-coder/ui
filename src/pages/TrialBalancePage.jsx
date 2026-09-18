import React from 'react';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { CustomTable } from '../components';
import { useSelector } from 'react-redux';
import { Stack } from '@fluentui/react';
import { Panel } from '@fluentui/react/lib/Panel';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { getAllTb } from '../features/tbSlice';
import { useNavigate } from "react-router-dom";
import { Text } from '@fluentui/react/lib/Text';

import { accountingPeriod } from '../utils/accountingPeriod';
const buttonStyles = { root: { marginRight: 8 } };
const dropdownStyles = { dropdown: { width: 300 } };
import { useDispatch } from 'react-redux';
export const TrialBalancePage = () => {
    const [itemsCount, setItemsCount] = React.useState(5);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [allTableData, setAllTableData] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openPanel, setOpenPanel] = React.useState(false)
    const itemsWithHref = [
        { text: 'Home', key: 'home', href: '/' },
        { text: 'Trial Balance', key: 'trialBalance' },
    ];
    const refreshHandler = () => {
        fetch('https://localhost:7117/tb')
            .then(response => response.json())
            .then(data => {
                dispatch(getAllTb(data));
            })
    }
    const _items = [
        {
            key: 'trialBalance',
            text: 'Trial Balance',
            cacheKey: 'myCacheKey',
            iconProps: { iconName: 'Add' },
            onClick: () => setOpenPanel(true),
        },
        {
            key: 'refresh',
            text: 'Refresh',
            iconProps: { iconName: 'Refresh' },
            onClick: () => refreshHandler(),
        },
    ];
    const tbList = useSelector((state) => state.tb.value);
    const tableColums = [
        { key: 'sno', name: 'S.No.', fieldName: 'sno', minWidth: 60  },
        { key: 'ref', name: 'Ref. No.', fieldName: 'ref', minWidth: 100 },
        { key: 'period', name: 'Period', fieldName: 'period', minWidth: 180 },
        { key: 'turnover', name: 'Turnover', fieldName: 'turnover', minWidth: 100 },
        { key: 'description', name: 'Description', fieldName: 'description', minWidth: 340 },
        { key: 'type', name: 'Type', fieldName: 'type', minWidth: 140 },
        { key: 'importType', name: 'Import Type', fieldName: 'importType', minWidth: 220 },
        { key: 'status', name: 'Status', fieldName: 'status', minWidth: 220 },
    ];

    React.useEffect(() => {
        const nextTableData = (Array.isArray(tbList) ? tbList : []).map((tb, idx) => {
            const entries = Array.isArray(tb.entries) ? tb.entries : [];
            const balance = entries.reduce((sum, entry) => sum + entry.debit - entry.credit, 0);
            const balanced = balance === 0;

            return {
                key: `tb-${idx + 1}`,
                sno: idx + 1,
                ref: `TB-${idx + 1}`,
                period: '(01/04/2026 - 31/03/2027)',
                turnover: balanced ? `£${entries.reduce((sum, entry) => sum + entry.debit, 0)}` : '-',
                description: 'Trial balance for the period ended 31 March, 2027',
                type: 'Annual',
                importType: 'Manual',
                status: balanced ? <span style={{ color: "white", backgroundColor: "green", padding: "4px 8px", borderRadius: "4px" }}>Balanced</span> : <span style={{ color: "white", backgroundColor: "red", padding: "4px 8px", borderRadius: "4px" }}>Unbalanced</span>
            };
        });

        setAllTableData(nextTableData);
        setCurrentPage(1);
        setTableData(nextTableData.slice(0, itemsCount));
    }, [tbList]);

    const pageCount = Math.max(1, Math.ceil(allTableData.length / itemsCount));

    const updateTablePage = (page, count = itemsCount) => {
        const startIndex = (page - 1) * count;
        setCurrentPage(page);
        setTableData(allTableData.slice(startIndex, startIndex + count));
    };

    const itemsCountChangeHandler = (_event, option) => {
        const nextItemsCount = Number(option?.key ?? 5);
        setItemsCount(nextItemsCount);
        updateTablePage(1, nextItemsCount);
    };
    const onRenderFooterContent = React.useCallback(
        () => (
            <div>
                <PrimaryButton onClick={() => navigate('/tax/clients/create')} styles={buttonStyles}>
                    Next
                </PrimaryButton>
                <DefaultButton onClick={() => setOpenPanel(false)}>Cancel</DefaultButton>
            </div>
        ),
        [openPanel],
    );

    return <div>
        <Breadcrumb
            items={itemsWithHref}
            maxDisplayedItems={3}
        />
        <FocusTrapZone disabled={true}>
            <CommandBar
                items={_items}
                ariaLabel="Inbox actions"
                primaryGroupAriaLabel="Email actions"
                farItemsGroupAriaLabel="More actions"
            />
        </FocusTrapZone>
        <div style={{ width: '80vw' }}>
            <CustomTable columns={tableColums} items={tableData} isCompactMode={false} isModalSelection={false} />
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { padding: '12px 8px' } }}>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                    <Text>Show</Text>
                    <Dropdown
                        selectedKey={itemsCount}
                        options={[{ key: 5, text: '5' }, { key: 10, text: '10' }, { key: 15, text: '15' }]}
                        onChange={itemsCountChangeHandler}
                        styles={{ dropdown: { width: 70 } }}
                    />
                    <Text>Items</Text>
                </Stack>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} >
                    <DefaultButton
                        text="Previous"
                        onClick={() => updateTablePage(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    <Text>{`${currentPage} of ${pageCount}`}</Text>
                    <DefaultButton
                        text="Next"
                        onClick={() => updateTablePage(currentPage + 1)}
                        disabled={currentPage >= pageCount}
                    />
                </Stack>
            </Stack>
        </div>
        <Panel
            isOpen={openPanel}
            onDismiss={() => setOpenPanel(false)}
            headerText="New Trial Balance"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <ChoiceGroup selectedKey={'A'} options={[{ key: 'A', text: 'Statutory' }, { key: 'B', text: 'Management', disabled: true }]} onChange={() => { }} label="Type" />
            <Dropdown
                label="Period"
                defaultSelectedKey={accountingPeriod(0)}
                options={[-1, 0, 1].map((i) => {
                    const accPeriod = accountingPeriod(i);
                    return {
                        key: accPeriod,
                        text: accPeriod,
                    }
                })}
                styles={dropdownStyles}
            />
            <ChoiceGroup selectedKey={'C'} options={[{ key: 'A', text: 'CSV', disabled: true }, { key: 'B', text: 'Bookkeeping', disabled: true }, { key: 'C', text: 'Manual' }]} onChange={() => { }} label="Mode of Import" />
        </Panel>
    </div>
}