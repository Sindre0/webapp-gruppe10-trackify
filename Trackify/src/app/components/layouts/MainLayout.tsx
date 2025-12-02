import { AuthProvider } from "@/app/AuthContext";
import Nav from "../navigation/Nav";
import { LayoutProps } from "rwsdk/router";
import { requestInfo } from "rwsdk/worker";

export default function MainLayout({children}: LayoutProps) {
    const { ctx } = requestInfo;
    const user = ctx?.user ?? undefined;
    return (
        <AuthProvider user={user}>
            <Nav/>
            <main>
                {children}
            </main>
        </AuthProvider>
    )
}
