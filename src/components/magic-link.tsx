"use client";

import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const MagicLink = () => {
    const [email, setEmail] = useState("");
    const searchParams = useSearchParams();
    const type = searchParams.get("type") ?? "";
    const emailRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (emailRef.current && type === "magic-link") {
            emailRef.current.focus();
        }
    }, [type]);

    return (
        <>
            <div className="space-y-4">
                <div className="relative">
                    <Input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className="py-6 pl-10"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <Button
                onClick={() => {
                    signIn("email", { email, callbackUrl: "/dashboard" });
                }}
                className="w-full text-white dark:border p-4"
                disabled={!email}
            >
                Log in with Magic Link
            </Button>
        </>
    )
}

export default MagicLink;