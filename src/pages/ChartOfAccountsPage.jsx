import React from 'react';
import { Checkbox, Stack } from '@fluentui/react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Text } from '@fluentui/react/lib/Text';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
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
        { key: 'sno', name: 'S.No', fieldName: 'sno', minWidth: 60, maxWidth: 80 },
        { key: 'code', name: 'Code', fieldName: 'code', minWidth: 100, maxWidth: 140 },
        { key: 'account', name: 'Account', fieldName: 'account', minWidth: 180 },
        { key: 'accountType', name: 'Account Type', fieldName: 'accountType', minWidth: 120, maxWidth: 160 },
        { key: 'accountGroup', name: 'Account Group', fieldName: 'accountGroup', minWidth: 220 },
    ];

    const tableItems = (Array.isArray(coaList) ? coaList : []).map((coa, idx) => {
        return {
            key: `coa-${idx + 1}`,
            sno: idx + 1,
            code: coa.code ?? coa.Code,
            account: coa.name ?? coa.Name,
            accountType: coa.accType ?? coa.accountType,
            accountGroup: coa.accGroup ?? coa.accountGroup
        }
    });

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
        <FocusTrapZone disabled={!enableFocusTrap}>
            <CommandBar
                items={_items}
                ariaLabel="Inbox actions"
                primaryGroupAriaLabel="Email actions"
                farItemsGroupAriaLabel="More actions"
            />
        </FocusTrapZone>
        <CustomTable columns={tableColums} items={tableItems} isCompactMode={false} isModalSelection={false} />
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