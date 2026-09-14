import * as React from "react";
import {
    Hamburger,
    NavDivider,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavItem,
    NavSectionHeader,
    Tooltip,
    makeStyles,
    tokens,
    mergeClasses,
} from "@fluentui/react-components";
import { useLocation } from "react-router-dom";
import {
    BoardRegular,
    NewsRegular,
    TaskListSquareLtrRegular,
    FormMultipleCollectionRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
    root: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
        overflow: "hidden",
    },

    nav: {
        width: "260px",
        height: "100%",
        minWidth: "260px",
        transition: "width 0.2s ease, min-width 0.2s ease",
    },

    navMini: {
        width: "64px",
        minWidth: "64px",
        overflowX: "hidden",

        "& .fui-NavItem__content": {
            display: "none",
        },
    },

    navItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: tokens.spacingHorizontalM,
        minHeight: "44px",
        paddingLeft: "16px",
        borderLeft: "3px solid transparent",
        boxSizing: "border-box",

        "& .fui-NavItem__icon": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0",

            "& svg": {
                width: "26px",
                height: "26px",
            },
        },

        "& .fui-NavItem__content": {
            display: "flex",
            alignItems: "center",
        },
    },

    navItemCollapsed: {
        justifyContent: "center",
        paddingLeft: "0",
    },
    navItemActive: {
        backgroundColor: "#eff8ff !important",
        borderLeft: "3px solid #8ac7f5 !important",
        color: "#0f6cbd !important",

        "& .fui-NavItem__content": {
            color: "#0f6cbd !important",
        },

        "& .fui-NavItem__icon": {
            color: "#0f6cbd !important",
        },
    },
});

export const NavBar = () => {
    const styles = useStyles();
    const location = useLocation();

    const [isExpanded, setIsExpanded] = React.useState(true);

    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    return (
        <div className={styles.root}>
            <NavDrawer
                open
                type="inline"
                defaultSelectedValue="2"
                className={mergeClasses(
                    styles.nav,
                    !isExpanded && styles.navMini
                )}
                density="medium"
            >
                <NavDrawerHeader>
                    <Tooltip relationship="label">
                        <Hamburger onClick={() => setIsExpanded((value) => !value)} />
                    </Tooltip>
                </NavDrawerHeader>

                <NavDrawerBody>
                    

                    <Tooltip
                        relationship="label"
                        positioning="right"
                        disabled={isExpanded}
                    >
                        <NavItem
                            href="/"
                            value="2"
                            className={mergeClasses(
                                styles.navItem,
                                !isExpanded && styles.navItemCollapsed,
                                isActive("/") && styles.navItemActive
                            )}
                            icon={<FormMultipleCollectionRegular />}
                        >
                            {isExpanded && "Clients"}
                        </NavItem>
                    </Tooltip>

                    <hr style={{
                        border: 'none',
                        borderTop: '1px solid #ccc',
                        margin: '10px 0'
                    }} />
                    {isExpanded && <NavSectionHeader>General Settings</NavSectionHeader>}

                    <Tooltip
                        relationship="label"
                        positioning="right"
                        disabled={isExpanded}
                    >
                        <NavItem
                            href="/coa"
                            value="5"
                            className={mergeClasses(
                                styles.navItem,
                                !isExpanded && styles.navItemCollapsed,
                                isActive("/coa") && styles.navItemActive
                            )}
                            icon={<NewsRegular />}
                        >
                            {isExpanded && "Chart of Accounts"}
                        </NavItem>
                    </Tooltip>

                    <hr style={{
                        border: 'none',
                        borderTop: '1px solid #ccc',
                        margin: '10px 0'
                    }} />
                    {isExpanded && <NavSectionHeader>Accounts</NavSectionHeader>}

                    <Tooltip
                        relationship="label"
                        positioning="right"
                        disabled={isExpanded}
                    >
                        <NavItem
                            href="/tb"
                            value="6"
                            className={mergeClasses(
                                styles.navItem,
                                !isExpanded && styles.navItemCollapsed,
                                isActive("/tb") && styles.navItemActive
                            )}
                            icon={<TaskListSquareLtrRegular />}
                        >
                            {isExpanded && "Trial Balances"}
                        </NavItem>
                    </Tooltip>
                </NavDrawerBody>
            </NavDrawer>
        </div>
    );
};