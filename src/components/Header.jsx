import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { WaffleIcon, ReportLibraryMirroredIcon, MegaphoneIcon, DoubleBookmarkIcon, HeadsetIcon, QuickNoteIcon } from '@fluentui/react-icons-mdl2';

const customStyles = {
    textStyle: {
        root: {
            color: "white"
        }
    },
    headerStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "40px",
        backgroundColor: "#4285f4",
        padding: "0 20px",
        boxSizing: "border-box"
    },
    stackStyles: {
        root: {
            background: "#4285f4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
    },
    iconStyles: {
        color: "white",
        padding: "0 20px",
        fontSize: "24px",
        cursor: "pointer"
    },
    profileStyles: {
        color: "white",
        backgroundColor: "green",
        borderRadius: "50%",
        marginLeft: "24px",
        padding: '8px'
    },
    searchStyles: {
        borderRadius: "4px"
    }
}

export const Header = () => {
    return (
        <header style={customStyles.headerStyle}>
            <Text variant={'xLarge'} block styles={customStyles.textStyle}>
                Acting Office 2
            </Text>
            <Stack enableScopedSelectors horizontal disableShrink styles={customStyles.stackStyles}>
                <SearchBox placeholder="Ctrl + K" onSearch={newValue => console.log('value is ' + newValue)} style={customStyles.searchStyles} />
                <WaffleIcon style={customStyles.iconStyles} />
                <ReportLibraryMirroredIcon style={customStyles.iconStyles} />
                <MegaphoneIcon style={customStyles.iconStyles} />
                <DoubleBookmarkIcon style={customStyles.iconStyles} />
                <HeadsetIcon style={customStyles.iconStyles} />
                <QuickNoteIcon style={customStyles.iconStyles} />
                <span style={customStyles.profileStyles}>LS</span>
            </Stack>
        </header >
    );
};