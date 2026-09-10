import './App.css';
// import NavElement from './components/Nav';
import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';

const buttonStyles = { root: { marginRight: 8 } };

const dropdownStyles = {
    dropdown: { width: 300 },
};
function App() {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    
    const submitHandler = () => {
        
    }
    // This panel doesn't actually save anything; the buttons are just an example of what
    // someone might want to render in a panel footer.
    const onRenderFooterContent = React.useCallback(
        () => (
            <div>
                <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
                <PrimaryButton onClick={submitHandler} styles={buttonStyles}>
                    Save
                </PrimaryButton>
                
            </div>
        ),
        [dismissPanel],
    );
    return (<>
        <div>
            <DefaultButton text="Open panel" onClick={openPanel} />
            <Panel
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close"
                onRenderFooterContent={onRenderFooterContent}
                isFooterAtBottom={true}
            >
                <p>New Trial Balance</p>
                <div>
                    <label htmlFor="trialName">Type</label>
                    <div>
                        <input type="radio" id="contactChoice1" name="contact" value="email" checked disabled/>
                        <label for="contactChoice1">Statutory</label>

                        <input type="radio" id="contactChoice2" name="contact" value="phone" disabled/>
                        <label for="contactChoice2">Management</label>
                    </div>
                    <label>Period</label>
                    <Dropdown
                        defaultSelectedKey="(02/04/2026 - 01/04/2027)"
                        disabled={true}
                        options={[{ key: "(02/04/2026 - 01/04/2027)", text: "(02/04/2026 - 01/04/2027)", itemType: DropdownMenuItemType.Header }, { key: "(02/04/2027 - 01/04/2028)", text: "(02/04/2027 - 01/04/2028)", itemType: DropdownMenuItemType.Header }]}
                        styles={dropdownStyles}
                    />
                    <label htmlFor="trialName">Mode of import</label>
                    <div>
                        <input type="radio" id="contactChoice1" name="mode" value="email" disabled />
                        <label for="contactChoice1">CSV</label>

                        <input type="radio" id="contactChoice2" name="mode" value="phone" disabled />
                        <label for="contactChoice2">Bookkeeping</label>

                        <input type="radio" id="contactChoice3" name="mode" value="mail" checked disabled />
                        <label for="contactChoice3">Manual</label>
                    </div>
                </div>
            </Panel>
        </div>

</>
        );
    
}

export default App;