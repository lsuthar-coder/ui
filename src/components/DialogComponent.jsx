
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
    makeStyles,
} from "@fluentui/react-components";
import { SaveRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    surface: {
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
    },
    title: {
        fontWeight: "700",
    },
    primaryButton: {
        backgroundColor: "#0f6cbd",
        color: "#ffffff",
        borderRadius: "6px",
        padding: "8px 18px",
        "&:hover": {
            backgroundColor: "#115ea3",
        },
    },

    secondaryButton: {
        backgroundColor: "#ffffff",
        color: "#242424",
        border: "1px solid #8a8886",
        borderRadius: "6px",
        padding: "8px 18px",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    },
});

export const DialogComponent = ({
    dialogHeading,
    dialogContent,
    open,
    setOpen,
    dialogHandler,
}) => {
    const styles = useStyles();

    return (
        <Dialog
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
        >
            <DialogTrigger disableButtonEnhancement>
                <Button
                    appearance="primary"
                    icon={<SaveRegular />}
                    className={styles.primaryButton}
                >
                    Next
                </Button>
            </DialogTrigger>

            <DialogSurface className={styles.surface}>
                <DialogBody>
                    <DialogTitle className={styles.title}>
                        {dialogHeading}
                    </DialogTitle>

                    <DialogContent>
                        {dialogContent}
                    </DialogContent>

                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button className={styles.secondaryButton}>
                                Cancel
                            </Button>
                        </DialogTrigger>

                        <Button
                            className={styles.primaryButton}
                            onClick={dialogHandler}
                        >
                            Continue Anyway
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};