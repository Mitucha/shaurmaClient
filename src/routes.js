import { AdminItems } from "./components/AdminComponents/AdmimItems/AdminItems";
import { Admin } from "./pages/Admin";
import { Block } from "./pages/Block";
import { CashierPage } from "./pages/CashierPage";
import { CashierUnPage } from "./pages/CashierUnPage";
import { CookPage } from "./pages/CookPage";
import { CookUnPage } from "./pages/CookUnPage";
import { Course } from "./pages/Course";
import { FranchisorPage } from "./pages/FranchisorPage";
import { Item } from "./pages/Item";
import { Registration } from "./pages/Registration";
import { CashierBlocksPage } from "./pages/adminBlocks/CashierBlocksPage";
import { ADMIN_ROUTE, COURSE_ROUTE, REGISTRATION_ROUTE, BLOCK_ROUTE, ITEM_ROUTE, ADMIN_CASHIER, ADMIN_COOK, ADMIN_UNIVERSAL_CASHIER, ADMIN_UNIVERSAL_COOK, ADMIN_FRANCHISOR, ADMIN_CASHIER_BLOCKS, ADMIN_ITEMS } from "./utils/consts";

export const dontAuthRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    
];

export const authRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: COURSE_ROUTE,
        Component: Course
    },
    {
        path: BLOCK_ROUTE,
        Component: Block
    },
    {
        path: ITEM_ROUTE,
        Component: Item
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_CASHIER,
        Component: CashierPage
    },
    {
        path: ADMIN_COOK,
        Component: CookPage
    },
    {
        path: ADMIN_UNIVERSAL_CASHIER,
        Component: CashierUnPage
    },
    {
        path: ADMIN_UNIVERSAL_COOK,
        Component: CookUnPage
    },
    {
        path: ADMIN_FRANCHISOR,
        Component: FranchisorPage
    },
    {
        path: ADMIN_CASHIER_BLOCKS,
        Component: CashierBlocksPage
    },
    {
        path: ADMIN_ITEMS,
        Component: AdminItems
    }
]