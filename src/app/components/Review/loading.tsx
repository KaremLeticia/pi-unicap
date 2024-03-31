import React from "react"
import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-14">

      <div className="flex items-center space-x-4 p-6">
        {/* <Skeleton className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  animate-pulse" /> */}

        <div className="space-y-2">

          <Skeleton className="h-4 w-40 bg-gray-200  rounded" />
          <Skeleton className="h-4 w-56  bg-gray-200 rounded" />
          <div className="flex space-x-24">
            <Skeleton className="h-4 w-28 bg-gray-200  rounded" />
            <Skeleton className="h-4 w-28 bg-gray-200  rounded" />
            <Skeleton className="h-4 w-28 bg-gray-200  rounded" />

          </div>

          <Skeleton className="h-[225px] w-[550px] bg-gray-200 rounded-xl" />
        </div>

      </div>
    </div>
  )
}