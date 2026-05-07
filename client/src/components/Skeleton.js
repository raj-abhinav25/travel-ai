import React from "react";
import "./Skeleton.css";

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image skeleton-shimmer" />
    <div className="skeleton-content">
      <div className="skeleton-line skeleton-line-lg skeleton-shimmer" />
      <div className="skeleton-line skeleton-line-sm skeleton-shimmer" />
      <div className="skeleton-line skeleton-line-md skeleton-shimmer" />
    </div>
  </div>
);

export const SkeletonChat = () => (
  <div className="skeleton-chat">
    <div className="skeleton-bubble skeleton-bubble-left skeleton-shimmer" />
    <div className="skeleton-bubble skeleton-bubble-right skeleton-shimmer" />
    <div className="skeleton-bubble skeleton-bubble-left skeleton-shimmer" style={{ width: '70%' }} />
  </div>
);

export const SkeletonDayCard = () => (
  <div className="skeleton-day-card">
    <div className="skeleton-day-header">
      <div className="skeleton-badge skeleton-shimmer" />
      <div className="skeleton-line skeleton-line-md skeleton-shimmer" />
    </div>
    <div className="skeleton-day-body">
      <div className="skeleton-slot skeleton-shimmer" />
      <div className="skeleton-slot skeleton-shimmer" />
      <div className="skeleton-slot skeleton-shimmer" />
    </div>
  </div>
);

const Skeleton = { SkeletonCard, SkeletonChat, SkeletonDayCard };
export default Skeleton;
