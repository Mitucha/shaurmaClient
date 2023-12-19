import { Admin } from "./pages/Admin";
import { Block } from "./pages/Block";
import { Course } from "./pages/Course";
import { Item } from "./pages/Item";
import { Registration } from "./pages/Registration";
import { ADMIN_ROUTE, COURSE_ROUTE, REGISTRATION_ROUTE, BLOCK_ROUTE, ITEM_ROUTE } from "./utils/consts";

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
    }
]