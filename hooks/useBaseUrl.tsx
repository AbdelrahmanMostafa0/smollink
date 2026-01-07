"use client";

import { useEffect, useState } from "react";

export function useBaseUrl() {
    const [baseUrl, setBaseUrl] = useState<string>("");

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    return baseUrl;
}
