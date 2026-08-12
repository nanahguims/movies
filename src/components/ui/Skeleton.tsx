"use client";

import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  count?: number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-6",
  className = "",
  count = 1,
  circle = false,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} ${circle ? "rounded-full" : "rounded-lg"} bg-gradient-to-r from-ghibli-100 to-ghibli-200 animate-pulse ${className}`}
        />
      ))}
    </>
  );
};

export const MovieCardSkeleton: React.FC<{ count?: number }> = ({
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <div className="w-full h-64 bg-ghibli-200 animate-pulse rounded-t-lg" />
          <div className="p-4 space-y-3">
            <Skeleton height="h-5" />
            <Skeleton height="h-4" width="w-2/3" />
            <div className="flex gap-2 pt-2">
              <Skeleton height="h-6" width="w-1/3" circle />
              <Skeleton height="h-6" width="w-1/3" circle />
            </div>
            <Skeleton height="h-10" className="mt-4" />
          </div>
        </div>
      ))}
    </>
  );
};
