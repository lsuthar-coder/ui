import { Nav } from '@fluentui/react/lib/Nav';

const navStyles = {
    root: {
        width: 208,
        height: 350,
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
    },
};
const navLinkGroups = [
    {
        links: [
            {
                name: 'Clients',
                url: 'http://example.com',
                expandAriaLabel: 'Expand Home section',
                isExpanded: true,
            },
            {
                name: 'Documents',
                url: 'http://example.com',
                key: 'key3',
                isExpanded: true,
                target: '_blank',
            },
            {
                name: 'Pages',
                url: 'http://msn.com',
                key: 'key4',
                target: '_blank',
            },
            {
                name: 'Notebook',
                url: 'http://msn.com',
                key: 'key5',
                disabled: true,
            },
            {
                name: 'Communication and Media',
                url: 'http://msn.com',
                key: 'key6',
                target: '_blank',
            },
            {
                name: 'News',
                url: 'http://cnn.com',
                icon: 'News',
                key: 'key7',
                target: '_blank',
            },
        ],
    },
];
function NavElement() {
  return (
      <Nav
          onLinkClick={_onLinkClick}
          selectedKey="key3"
          ariaLabel="Nav basic example"
          styles={navStyles}
          groups={navLinkGroups}

      />
  );
}

function _onLinkClick(ev, item) {
    if (item && item.name === 'News') {
        alert('News link clicked');
    }
}

export default NavElement;