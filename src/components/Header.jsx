
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import CampaignIcon from '@mui/icons-material/Campaign';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import NoteIcon from '@mui/icons-material/Note';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@fluentui/react/lib/TextField';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Text } from "@fluentui/react-components";
import { SearchRegular } from '@fluentui/react-icons';

const icons = [
    { icon: <SnippetFolderIcon style={{color: 'white', cursor: "pointer"}}/>, text: "Modules" },
    { icon: <CampaignIcon style={{color: 'white', cursor: "pointer"}}/>, text: "Support" },
    { icon: <BookmarksIcon style={{color: 'white', cursor: "pointer"}}/>, text: "What's New" },
    { icon: <SnippetFolderIcon style={{color: 'white', cursor: "pointer"}}/>, text: "Bookmark" },
    { icon: <HeadsetMicIcon style={{color: 'white', cursor: "pointer"}}/>, text: "Live calls and chats" },
    { icon: <NoteIcon style={{color: 'white', cursor: "pointer"}}/>, text: "Sticky Notes" },
    { icon: <PersonIcon style={{color: 'white', backgroundColor: 'green', borderRadius: "100%", cursor: "pointer"}}/>, text: "Profile" },
];

export const Header = () => {
    return (
        <header style={{
            display: "flex",
            alignItems: "center",           
            justifyContent: "space-between", 
            width: "100%",
            height: "60px",                
            backgroundColor: "#2886de",
            padding: "0 20px",            
            boxSizing: "border-box"
        }}>
            <Text
                style={{ color: "#fff" }}
                size={500}
                weight='bold'
            >
                Acting Office 2
            </Text>

            <div style={{ display: "flex", justifyContent: "center"}}>
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 255, 255)', 
                    borderRadius: '4px',
                    padding: '0 8px',
                    marginLeft: '16px' 
                }}>
                    <SearchRegular style={{ color: "#050505", marginRight: "4px" }} />
                    <TextField
                        placeholder="Ctrl + K"
                        styles={{ fieldGroup: { border: "none", background: "transparent" } }}
                    />
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "0" }}>
                    {icons.map((icon) => (
                        <ActionButton
                            key={icon.text}
                            allowDisabledFocus
                            disabled={true}
                            title={icon.text}
                            style={{ minWidth: "auto", padding: "8px" }} 
                        >

                            {icon.icon}
                        </ActionButton>
                    ))}
                </div>
            </div>







        </header>
    );
};
