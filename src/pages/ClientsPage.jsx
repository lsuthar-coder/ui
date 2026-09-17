import * as React from 'react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { setVirtualParent } from '@fluentui/dom-utilities';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { CustomTable } from '../components';
const customStyles = {
    breadcrumbStyles: {

    },

}
export const ClientsPage = () => {
    const itemsWithHref = [
        { text: 'Home', key: 'home', href: '/' },
        { text: 'Clients', key: 'clients' },
    ];
    const _items = [
        {
            key: 'addBusiness',
            text: 'Add Business',
            cacheKey: 'myCacheKey',
            iconProps: { iconName: 'Add' },
            subMenuProps: {
                items: [
                    {
                        key: 'addProposedBusiness',
                        text: 'Add proposed business',
                        iconProps: { iconName: 'BuildDefinition' },
                        ['data-automation-id']: 'newEmailButton',
                    },
                ],
            },
        },
        {
            key: 'assignment',
            text: 'Assignmant',
            iconProps: { iconName: 'Upload' },
            subMenuProps: {
                items: [
                    {
                        key: 'Assignment',
                        text: 'File',
                        preferMenuTargetAsEventTarget: true,
                        onClick: (ev) => {
                            ev?.persist();

                            Promise.resolve().then(() => {
                                const inputElement = document.createElement('input');
                                inputElement.style.visibility = 'hidden';
                                inputElement.setAttribute('type', 'file');

                                document.body.appendChild(inputElement);

                                const target = ev?.target;

                                if (target) {
                                    setVirtualParent(inputElement, target);
                                }

                                inputElement.click();

                                if (target) {
                                    setVirtualParent(inputElement, null);
                                }

                                setTimeout(() => {
                                    inputElement.remove();
                                }, 10000);
                            });
                        },
                    },
                    {
                        key: 'uploadfolder',
                        text: 'Folder',
                        preferMenuTargetAsEventTarget: true,
                        onClick: (ev) => {
                            ev?.persist();

                            Promise.resolve().then(() => {
                                const inputElement = document.createElement('input');
                                inputElement.style.visibility = 'hidden';
                                inputElement.setAttribute('type', 'file');

                                (inputElement).webkitdirectory = true;

                                document.body.appendChild(inputElement);

                                const target = ev?.target;

                                if (target) {
                                    setVirtualParent(inputElement, target);
                                }

                                inputElement.click();

                                if (target) {
                                    setVirtualParent(inputElement, null);
                                }

                                setTimeout(() => {
                                    inputElement.remove();
                                }, 10000);
                            });
                        },
                    },
                ],
            },
            disabled: true,
        },
        {
            key: 'refresh',
            text: 'Refresh',
            iconProps: { iconName: 'Refresh' },
            onClick: () => console.log('Share'),
        },
        {
            key: 'download',
            text: 'Download',
            iconProps: { iconName: 'Download' },
            onClick: () => console.log('Download'),
        },
    ];

    const tableColums = [
        { key: 'serialNumber', name: 'S.No', fieldName: 'serialNumber', minWidth: 60, maxWidth: 80 },
        { key: 'clientId', name: 'Client ID', fieldName: 'clientId', minWidth: 100, maxWidth: 140 },
        { key: 'businessName', name: 'Business Name', fieldName: 'businessName', minWidth: 180 },
        { key: 'type', name: 'Type', fieldName: 'type', minWidth: 120, maxWidth: 160 },
        { key: 'email', name: 'Email', fieldName: 'email', minWidth: 220 },
    ];

    const tableItems = [
        { key: 'client-001', serialNumber: 1, clientId: 'CL-001', businessName: 'Northwind Traders', type: 'Private', email: 'contact@northwind.example' },
        { key: 'client-002', serialNumber: 2, clientId: 'CL-002', businessName: 'Contoso Retail', type: 'Partnership', email: 'hello@contoso.example' },
        { key: 'client-003', serialNumber: 3, clientId: 'CL-003', businessName: 'Fabrikam Services', type: 'Private', email: 'admin@fabrikam.example' },
        { key: 'client-004', serialNumber: 4, clientId: 'CL-004', businessName: 'Adventure Works', type: 'Public', email: 'accounts@adventureworks.example' },
        { key: 'client-005', serialNumber: 5, clientId: 'CL-005', businessName: 'Tailspin Toys', type: 'Sole Proprietorship', email: 'info@tailspintoys.example' },
    ];

    const [enableFocusTrap, setEnableFocusTrap] = React.useState(false);

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
    </div>
}