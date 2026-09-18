import React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

const dialogStyles = { main: { maxWidth: 450 } };

export const CustomDialog = ({ toggleHideDialog, data, hideDialog }) => {
    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Missing Subject',
        closeButtonAriaLabel: 'Close',
        subText: 'Do you want to send this message without a subject?',
    };
    const modalProps = React.useMemo(
        () => ({
            titleAriaId: labelId,
            subtitleAriaId: subTextId,
            isBlocking: false,
            styles: dialogStyles,
            dragOptions: isDraggable ? dragOptions : undefined,
        }),
        [isDraggable, labelId, subTextId],
    );
    return <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
    >   
        <DialogFooter>
            <DefaultButton onClick={toggleHideDialog} text="Close" />
        </DialogFooter>
    </Dialog>
}