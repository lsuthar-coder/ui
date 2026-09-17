import { Nav } from '@fluentui/react/lib/Nav';
import { useState } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

export const NavBar = () => {
    const [navOpen, setNavOpen] = useState(true);
    const navStyles = {
        root: {
            width: navOpen ? 208 : 50,
            height: "100vh",
            boxSizing: 'border-box',
            border: '1px solid #eee',
            overflowY: 'auto',
        },
        link: {
            whiteSpace: 'normal',
            lineHeight: 'inherit',
        },
    };
    const navLinkGroups = [
        {
            links: [
                {
                    icon: 'GlobalNavButton',
                    onClick: () => setNavOpen(prev => !prev),
                    title: 'Collapse Navigation'
                },
                {
                    name: 'Dashboard',
                    url: '/',
                    key: 'key1',
                    title: 'Dashboard',
                    icon: 'ViewDashboard',
                },
                {
                    name: 'Clients',
                    url: '/tax',
                    key: 'key2',
                    title: 'Clients',
                    icon: 'FabricFormLibrary'
                },
                {
                    name: 'Chart of Accounts',
                    url: '/tax/generalsettings/accounts',
                    key: 'key3',
                    title: 'Chart of Accounts',
                    icon: 'News'
                },
                ,
                {
                    name: 'Trial Balances',
                    url: '/tax/clients/',
                    key: 'key4',
                    title: 'Trial Balances',
                    icon: 'TaskManager'
                },
            ],
        },
    ];
    return <Nav selectedKey="key6" ariaLabel="Nav example with wrapped link text" styles={navStyles} groups={navLinkGroups} />
}