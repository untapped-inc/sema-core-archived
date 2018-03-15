import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

// import water from "assets/img/sema/sema-water-icon.png";
// import semaMap from "assets/img/sema/sema-map.svg";

import {
    Business,
    LocalShipping,
    ShoppingCart,
    Shop,
    LocationOn,
    AccountBalance
} from "material-ui-icons";

const appRoutes = [
    {
        path: "/dashboard",
        sidebarName: "Water Operations",
        navbarName: "Water Operations",
        icon: Business,
        component: DashboardPage
    },
    {
        path: "/user",
        sidebarName: "Sales",
        navbarName: "Sales",
        icon: ShoppingCart,
        component: UserProfile
    },
    {
        path: "/table",
        sidebarName: "Distribution Map",
        navbarName: "Distribution Map",
        icon: LocationOn,
        component: TableList
    },
    {
        path: "/typography",
        sidebarName: "Delivery Schedule",
        navbarName: "Delivery Schedule",
        icon: LocalShipping,
        component: Typography
    },
    {
        path: "/icons",
        sidebarName: "Inventory Management",
        navbarName: "Inventory Management",
        icon: Shop,
        component: Icons
    },
    {
        path: "/maps",
        sidebarName: "Financials",
        navbarName: "Financials",
        icon: AccountBalance,
        component: Maps
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
