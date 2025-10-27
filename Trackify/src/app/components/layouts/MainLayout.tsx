import { AuthProvider } from "@/app/AuthContext";
import Nav from "../Nav";
import { LayoutProps } from "rwsdk/router";
import { requestInfo } from "rwsdk/worker";

export default function MainLayout({children}: LayoutProps) {
    const { ctx } = requestInfo;
    const user = ctx?.user ?? {};
    console.log("MainLayout user:", user);
    return (
        <AuthProvider user={user}>
            <div>
                <Nav/>
                {children}
            </div>
        </AuthProvider>
    )
}
