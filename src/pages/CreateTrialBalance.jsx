import { Text } from '@fluentui/react/lib/Text';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import { CustomInputTable } from '../components';
import {  useNavigate } from 'react-router-dom';
import React from 'react';
import { Checkbox, Stack } from '@fluentui/react';
import { DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { typeData } from '../assets/accGroups'

import { useDispatch } from 'react-redux';
import { createCoa } from '../features/coaSlice';
const dropdownStyles = { dropdown: { width: 'auto' } };
const formRowStyles = { root: { width: '100%', alignItems: 'center', paddingBottom: 6 } };
const formLabelStyles = { root: { textAlign: 'left', paddingLeft: 8 } };
const buttonStyles = { root: { marginRight: 8 } };
const stackTokens = { childrenGap: 0 };
const formControlStyles = {
    root: {
        width: '75%',
        marginLeft: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: 6,
    },
};
const stackStyles = { root: { paddingBottom: 6 } };
const formControlWithButtonStyles = {
    root: {
        ...formControlStyles.root,
        height: 44,
        justifyContent: 'space-between',
    },
};
const commandButtonStyles = {
    root: {
        color: 'white',
        backgroundColor: '#0078d4',
        border: 'none',
        borderRadius: 4,
        height: 36,
        minWidth: 150,
    },
    rootHovered: {
        color: 'white',
        backgroundColor: '#106ebe',
    },
    rootPressed: {
        color: 'white',
        backgroundColor: '#005a9e',
    },
};

export const CreateTrialBalance = () => {
    const [panelOpen, setPanelOpen] = React.useState(false)
    const [type, setType] = React.useState("")
    const [name, setName] = React.useState("")
    const [code, setCode] = React.useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const itemsWithHref = [
        { text: 'Home', key: 'home', href: '/' },
        { text: 'Trial Balances', key: 'trialbalances' },
    ];
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
    const menuProps = {
        items: [
            {
                key: 'account',
                text: 'Account',
                iconProps: { iconName: 'add' },
                onClick: () => setPanelOpen(true),
            },
            {
                key: 'chartOfAccount',
                text: 'Chart of Accounts',
                iconProps: { iconName: 'Calendar' },
                onClick: () => navigate('/tax/generalsettings/accounts'),
            },
        ],
    };
    const closePanelhandler = () => {
        setPanelOpen(false);
        setName("");
        setCode("");
        setType("");
    }
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
    const onRenderFooterContent = () => (
        <div>
            <PrimaryButton onClick={submitHandler} styles={buttonStyles}>
                Save
            </PrimaryButton>
            <DefaultButton onClick={closePanelhandler}>Cancel</DefaultButton>
        </div>
    );
    return <Stack tokens={{ maxWidth: "40vw" }} styles={stackStyles}>
        <Breadcrumb
            items={itemsWithHref}
            maxDisplayedItems={3}
        />
        <Text styles={formLabelStyles}>Add Journal</Text>
        <br />
        <Stack horizontal styles={formRowStyles}>
            <Text styles={formLabelStyles}>Ref</Text>
            <Stack horizontal styles={formControlStyles}>
                <TextField placeholder='TB-08-J01' disabled />
                <CommandBarButton
                    iconProps={{ iconName: 'Add' }}
                    text="Account"
                    menuProps={menuProps}
                    styles={commandButtonStyles}
                />
            </Stack>
        </Stack>
        <Stack horizontal styles={formRowStyles}>
            <Text styles={formLabelStyles}>Period</Text>
            <Stack styles={formControlWithButtonStyles} horizontal>
                <Dropdown
                    selectedKey={'A'}
                    onChange={() => { }}
                    options={[{ key: 'A', text: '(01/04/2025 - 31/03/2026)', disabled: true }]}
                    styles={dropdownStyles}
                />
                <CommandBarButton
                    iconProps={{ iconName: 'Add' }}
                    text="Import Balances"
                    styles={commandButtonStyles}
                />
            </Stack>
        </Stack>
        <Stack horizontal styles={formRowStyles}>
            <Text styles={formLabelStyles}>Journal Type</Text>
            <Stack styles={{ root: { ...formControlStyles.root, height: 44 } }} horizontal>
                <Dropdown
                    selectedKey={'A'}
                    onChange={() => { }}
                    options={[{ key: 'A', text: 'Normal Adjusting', disabled: true }]}
                    styles={dropdownStyles}
                />
            </Stack>    
        </Stack>
        <Stack horizontal styles={formRowStyles}>
            <Text styles={formLabelStyles}>Description</Text>
            <Stack styles={{ root: { ...formControlStyles.root, height: 'auto' } }}>
                <TextField
                    multiline
                    rows={3}
                    styles={{ fieldGroup: { width: '30vw' } }}
                />
            </Stack>
        </Stack>
        <CustomInputTable />
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
    </Stack>
}