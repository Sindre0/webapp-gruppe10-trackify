import Breadcrumbs from "../Breadcrumbs";
import Nav from "../Nav";
import { LayoutProps } from "rwsdk/router";

export default function MainLayout({children}: LayoutProps) {
    return (
        <>
            <Nav/>
            {children}
        </>
    )
}