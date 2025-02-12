import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UserPlus } from "lucide-react";

export default function SignInAndOut({ pathname }: { pathname: string }) {
    return (
        <div className="flex items-center justify-end h-14">
            <SignedOut>
                <SignInButton
                    mode="modal"
                    forceRedirectUrl={pathname}
                    signUpForceRedirectUrl={pathname}
                >
                    <UserPlus />
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
}
