import { useEffect, useState } from "react";

const useFingerprint = () => {
    const [fingerprint, setFingerprint] = useState<string | null>(null);

    useEffect(() => {
        const loadFingerprint = async () => {
            if (typeof window !== "undefined") {
                const { ClientJS } = await import("clientjs");
                const client = new ClientJS();
                setFingerprint(client.getFingerprint().toString());
            }
        };
        loadFingerprint();
    }, []);

    return fingerprint;
};

export default useFingerprint;
