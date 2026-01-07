"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { usePathname } from "next/navigation";
import { useBaseUrl } from "@/hooks/useBaseUrl";
import ShortenLink from "./ShortenLink";
const validUrlRegex = /^https?:\/\/.*$/;
const urlSchema = z.object({
  url: z.string().regex(validUrlRegex, "Invalid URL"),
});
const UrlShortenForm = () => {
  const baseUrl = useBaseUrl()
  const [shortenUrl, setShortenUrl] = useState("")
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(urlSchema),
  })
  const pathname = usePathname()

  const handleSubmitUrl = handleSubmit(async (data) => {
    try {
      setShortenUrl("") // Reset previous result temporarily
      const res = await api.post("/url", data)
      setShortenUrl(`${baseUrl}/${res.data.shortUrl.shortUrl}`)
      reset() // Optional: clear input after successful shorten? Maybe keep it.
    } catch (error) {
      console.error(error)
      // Consider adding a toast notification here for error
    }
  })

  return (
    <div className="w-full space-y-6">
      <form noValidate className="w-full flex flex-col gap-2 relative" onSubmit={handleSubmitUrl}>
        <div className="relative group">
          <Input
            placeholder="https://example.com/long-url"
            type="url"
            {...register("url")}
            className="w-full h-14  pr-32 rounded-2xl border-slate-200 bg-white shadow-sm text-lg focus-visible:ring-blue-500 transition-all group-hover:border-blue-300"
          />
          <div className="absolute inset-y-1 right-1">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-full rounded-xl px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all hover:shadow-md disabled:opacity-70"
            >
              {isSubmitting ? "Smol-ing..." : "Shorten"}
            </Button>
          </div>
        </div>

        {errors.url && (
          <p className="text-red-500 text-sm text-left px-2 font-medium animate-in slide-in-from-top-1">
            {errors.url.message}
          </p>
        )}
      </form>

      {(shortenUrl || isSubmitting) && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <ShortenLink loading={isSubmitting} url={shortenUrl} />
        </div>
      )}
    </div>
  );
};

export default UrlShortenForm;
