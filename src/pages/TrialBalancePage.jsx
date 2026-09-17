import React from 'react';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { CustomTable } from '../components';
import { useSelector } from 'react-redux';
import { Panel } from '@fluentui/react/lib/Panel';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { getAllTb } from '../features/tbSlice';
import { useNavigate } from "react-router-dom";
const buttonStyles = { root: { marginRight: 8 } };
const dropdownStyles = { dropdown: { width: 300 } };
import { useDispatch } from 'react-redux';
export const TrialBalancePage = () => {
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
        { key: 'sno', name: 'S.No.', fieldName: 'sno', minWidth: 60, maxWidth: 80 },
        { key: 'ref', name: 'Ref. No.', fieldName: 'ref', minWidth: 100, maxWidth: 140 },
        { key: 'turnover', name: 'Turnover', fieldName: 'turnover', minWidth: 180 },
        { key: 'type', name: 'Type', fieldName: 'type', minWidth: 120, maxWidth: 160 },
        { key: 'importType', name: 'Import Type', fieldName: 'importType', minWidth: 220 },
        { key: 'status', name: 'Status', fieldName: 'status', minWidth: 220 },
    ];

    const tableItems = (Array.isArray(tbList) ? tbList : []).map((tb, idx) => {
        let balanced = 0 == tb.entries.reduce((sum, entry) => sum + entry.debit - entry.credit, 0);
        return {
            key: `tb-${idx + 1}`,
            sno: idx + 1,
            ref: `TB-${idx + 1}`,
            turnover: balanced ? tb.entries.reduce((sum, entry) => sum + entry.debit, 0) : '-',
            type: 'Annual',
            importType: 'Manual',
            status: balanced ? <span style={{ color: "white", backgroundColor: "green", padding: "4px 8px", borderRadius: "4px" }}>Balanced</span> : <span style={{ color: "white", backgroundColor: "red", padding: "4px 8px", borderRadius: "4px" }}>Unbalanced</span>

        }
    });
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
        <CustomTable columns={tableColums} items={tableItems} isCompactMode={false} isModalSelection={false} />
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
                selectedKey={'A'}
                onChange={() => { }}
                options={[{ key: 'A', text: '(01/04/2025 - 31/03/2026)', disabled: true }]}
                styles={dropdownStyles}
            />
            <ChoiceGroup selectedKey={'C'} options={[{ key: 'A', text: 'CSV', disabled: true }, { key: 'B', text: 'Bookkeeping', disabled: true }, { key: 'C', text: 'Manual' }]} onChange={() => { }} label="Mode of Import" />
        </Panel>
    </div>
}