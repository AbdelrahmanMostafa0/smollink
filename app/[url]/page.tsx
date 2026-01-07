import serverApi from '@/lib/server-api'
import React from 'react'
import { notFound, redirect } from 'next/navigation'
import axios from 'axios'

const page = async ({ params }: { params: Promise<{ url: string }> }) => {
    const { url } = await params
    let redirectUrl: string | null = null;

    try {
        const res = await axios.get(`http://localhost:3000/api/url/${url}`)
        if (res.data?.url) {
            redirectUrl = res.data.url
        }
    } catch (error) {
        // We catch the error (like 404 from axios) and fall through to notFound()
        // We can log it if strictly necessary, but 404s are expected.
        console.error("Error fetching short URL:", error);
    }

    if (redirectUrl) {
        redirect(redirectUrl)
    }

    return notFound()
}

export default page