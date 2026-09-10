import './App.css';
// import NavElement from './components/Nav';
import React, { useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { useBoolean } from '@fluentui/react-hooks';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react';

const stackTokens = { childrenGap: 40 };

function App() {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
    }
    const clearHandler = () => { }
    return (<>
        <div>
            <DefaultButton text="Open panel" onClick={openPanel} />
            <Panel
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close"
            ><p>Add Account</p>
                <form onClick={(e) => submitHandler(e)} >
                    <div>
                        <Text block>Name</Text>
                        <TextField value={name} onChange={(e, newValue) => setName(newValue)} />
                    </div>
                    <div>
                        <Text block>Code</Text>
                        <MaskedTextField mask="m\ask: 99 - 99" value={`${code}`} onChange={(e, newValue) => setCode(`${newValue.toString().slice(0, 2)} - ${newValue.toString().slice(2, 4)}`)} />
                    </div>
                    <Stack horizontal tokens={stackTokens}>
                        <DefaultButton text="Cancel" onClick={clearHandler} />
                        <PrimaryButton text="Save" onClick={submitHandler} />
                    </Stack>
                </form>


            </Panel>

        </div>

    </>
    );

}

export default App;