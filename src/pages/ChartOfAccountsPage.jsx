import { Pivot, PivotItem } from '@fluentui/react';
import React from 'react';
import { Checkbox, Stack } from '@fluentui/react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { Separator } from '@fluentui/react/lib/Separator';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Text } from '@fluentui/react/lib/Text';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { IconButton } from '@fluentui/react/lib/Button';
import { CustomTable } from '../components';
import { useSelector } from 'react-redux';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { typeData } from '../assets/accGroups'
import { useDispatch } from 'react-redux';
import { createCoa, getAllCoa } from '../features/coaSlice';
const buttonStyles = { root: { marginRight: 8 } };
const stackTokens = { childrenGap: 0 };
const dropdownStyles = { dropdown: { width: 300, marginTop: "8px" } };

export const ChartOfAccountsPage = () => {
    const [itemsCount, setItemsCount] = React.useState(5);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [allTableData, setAllTableData] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const [enableFocusTrap, setEnableFocusTrap] = React.useState(false);
    const [panelOpen, setPanelOpen] = React.useState(false);
    const [name, setName] = React.useState("")
    const [code, setCode] = React.useState("")
    const [type, setType] = React.useState("")
    const dispatch = useDispatch()
    const itemsWithHref = [
        { text: 'Home', key: 'home', href: '/' },
        { text: 'Chart of Accounts', key: 'chartOfAccounts' },
    ];

    const refreshHandler = () => {
        fetch('https://localhost:7117/coa')
            .then(response => response.json())
            .then(data => {
                dispatch(getAllCoa(data));
            })
    }

    const _items = [
        {
            key: 'account',
            text: 'Account',
            cacheKey: 'myCacheKey',
            iconProps: { iconName: 'Add' },
            onClick: () => setPanelOpen(true)
        },
        {
            key: 'refresh',
            text: 'Refresh',
            iconProps: { iconName: 'Refresh' },
            onClick: refreshHandler,
        },
        {
            key: 'download',
            text: 'Download',
            iconProps: { iconName: 'Download' },
            onClick: () => console.log('Download'),
        },
    ];
    const coaList = useSelector((state) => state.coa.value);

    const tableColums = [
        { key: 'sno', name: 'S.No', fieldName: 'sno', minWidth: 100 },
        { key: 'code', name: 'Code', fieldName: 'code', minWidth: 100 },
        { key: 'account', name: 'Account', fieldName: 'account', minWidth: 500 },
        { key: 'accountType', name: 'Account Type', fieldName: 'accountType', minWidth: 180 },
        { key: 'accountGroup', name: 'Account Group', fieldName: 'accountGroup', minWidth: 180 },
        { key: 'forClients', name: 'For Clients', fieldName: 'forClients', minWidth: 100 },
        { key: 'archive', name: 'Archive', fieldName: 'archive', minWidth: 100 },
        { key: 'edit', name: '', fieldName: 'edit', minWidth: 100 },
    ];

    React.useEffect(() => {
        const nextTableData = (Array.isArray(coaList) ? coaList : []).map((coa, idx) => ({
            key: `coa-${idx + 1}`,
            sno: idx + 1,
            code: coa.code ?? coa.Code,
            account: coa.name ?? coa.Name,
            accountType: coa.accType ?? coa.accountType,
            accountGroup: coa.accGroup ?? coa.accountGroup,
            forClients: <Checkbox />,
            archive: <Checkbox />,
            edit: <IconButton iconProps={{ iconName: 'Edit' }} title="Edit" ariaLabel="Edit" disabled={!true} />
        }));

        setAllTableData(nextTableData);
        setCurrentPage(1);
        setTableData(nextTableData.slice(0, itemsCount));
    }, [coaList]);

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

    const options = typeData.flatMap((group) => [
        {
            key: `header-${group.order}`,
            text: group.name,
            itemType: DropdownMenuItemType.Header
        },
        ...group.types.map((type, idx) => ({
            key: `${group.order}-${idx + 1}`,
            text: type
        }))
    ]);

    const submitHandler = () => {
        setPanelOpen(false);
        let [accGroupIdx, accTypeIdx] = type.split('-')
        let accGroup = typeData.find((itm) => itm.order == accGroupIdx)
        let accType = accGroup.types[accTypeIdx - 1]

        dispatch(createCoa({ name: name, code: code, accType: accType, accGroup: accGroup.name }))
        setName("");
        setCode("");
        setType("");
    }
    const closePanelhandler = () => {
        setPanelOpen(false);
        setName("");
        setCode("");
        setType("");
    }

    const onRenderFooterContent = () => (
        <div>
            <PrimaryButton onClick={submitHandler} styles={buttonStyles}>
                Save
            </PrimaryButton>
            <DefaultButton onClick={closePanelhandler}>Cancel</DefaultButton>
        </div>
    );
    return <div>
        <Breadcrumb
            items={itemsWithHref}
            maxDisplayedItems={3}
        />
        <Separator />
        <Pivot aria-label="Basic Pivot Example">
            {['Limited', 'LLP', 'Individual', 'Partnership', 'Limited Partnership'].map((pivotItem) => {
                return <PivotItem headerText={pivotItem} key={pivotItem} />
            })}
        </Pivot>
        <FocusTrapZone disabled={!enableFocusTrap}>
            <CommandBar
                items={_items}
                ariaLabel="Inbox actions"
                primaryGroupAriaLabel="Email actions"
                farItemsGroupAriaLabel="More actions"
            />
        </FocusTrapZone>
        <div style={{ width: '80vw' }}>
            <CustomTable columns={tableColums} items={tableData} isCompactMode={true} isModalSelection={false} />
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
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
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
            isOpen={panelOpen}
            onDismiss={closePanelhandler}
            headerText="Add Account"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
            type={PanelType.custom}
            customWidth={'500px'}
        >
            <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant='' nowrap>
                    Business Type
                </Text>
                <Stack tokens={stackTokens} style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                    <Checkbox label="Limited" defaultChecked />

                    <Checkbox label="LLP" defaultChecked />

                    <Checkbox label="Individual" defaultChecked />

                    <Checkbox label="Partnership" defaultChecked />
                </Stack>
            </Stack>
            <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant='' nowrap>
                    Account Type
                </Text>
                <Stack tokens={stackTokens} style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                    <Dropdown
                        placeholder="Search Account Type"
                        ariaLabel="Custom dropdown label example"
                        styles={dropdownStyles}
                        options={options}
                        selectedKey={type || undefined}
                        onChange={(_event, option) => {
                            setType(option?.key ?? '')
                        }}
                    />
                </Stack>
            </Stack>
            <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant='' nowrap>
                    Name
                </Text>
                <Stack tokens={stackTokens} style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                    <TextField styles={{ fieldGroup: { width: 300, marginTop: "8px" } }} onChange={(_event, newValue) => setName(newValue || "")} />
                </Stack>
            </Stack>
            <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant='' nowrap>
                    Code
                </Text>
                <Stack tokens={stackTokens} style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                    <TextField styles={{ fieldGroup: { width: 300, marginTop: "8px" } }} onChange={(_event, newValue) => setCode(newValue || "")} />
                </Stack>
            </Stack>

        </Panel>
    </div>
}