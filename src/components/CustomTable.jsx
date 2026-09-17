import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
    },
});
const controlStyles = {
    root: {
        margin: '0 30px 20px 0',
        maxWidth: '300px',
    },
};

export const CustomTable = ({ columns, items, isCompactMode, isModalSelection }) => {
    const [tableItems, setTableItems] = React.useState(items || []);
    const [selection] = React.useState(() => new Selection({ getKey: (item) => item.key }));

    React.useEffect(() => {
        setTableItems(items || []);
    }, [items]);

    const onChangeText = (_event, text) => {
        const searchText = text?.toLowerCase() || '';
        setTableItems(
            searchText
                ? (items || []).filter((item) =>
                    Object.values(item).some((value) => String(value).toLowerCase().includes(searchText)),
                )
                : items || [],
        );
    };

    const onItemInvoked = (item) => {
        console.log('Selected client:', item);
    };

    return <div>
        
        <div className={classNames.controlWrapper}>
            {isModalSelection ? (
                <MarqueeSelection selection={selection}>
                    <DetailsList
                        items={tableItems}
                        compact={isCompactMode}
                        columns={columns}
                        selectionMode={SelectionMode.multiple}
                        setKey="multiple"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={selection}
                        selectionPreservedOnEmptyClick={true}
                        onItemInvoked={onItemInvoked}
                        enterModalSelectionOnTouch={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </MarqueeSelection>
            ) : (
                <DetailsList
                    items={tableItems}
                    compact={isCompactMode}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    getKey={(item) => item.key}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={onItemInvoked}
                />
            )}
        </div>
    </div>
}

