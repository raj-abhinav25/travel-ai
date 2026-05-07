import React from "react";
import { Wallet, Car, Hotel, Utensils, Package } from "lucide-react";
import "./BudgetBreakdown.css";

const BudgetBreakdown = ({ breakdown, totalBudget }) => {
  if (!breakdown) return null;

  const categories = [
    { key: "travel", label: "Travel", icon: <Car size={15} />, color: "#0f3460" },
    { key: "stay", label: "Stay", icon: <Hotel size={15} />, color: "#e94560" },
    { key: "food", label: "Food", icon: <Utensils size={15} />, color: "#f59e0b" },
    { key: "misc", label: "Misc", icon: <Package size={15} />, color: "#10b981" },
  ];

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="budget-breakdown animate-fade-in-up" id="budget-breakdown">
      <div className="budget-header">
        <div className="budget-header-left">
          <Wallet size={18} strokeWidth={2} />
          <h3 className="budget-title">Budget Breakdown</h3>
        </div>
        <div className="budget-total">₹{total.toLocaleString()}</div>
      </div>

      <div className="budget-bar">
        {categories.map((cat) => {
          const value = breakdown[cat.key] || 0;
          const percentage = (value / total) * 100;
          return (
            <div
              key={cat.key}
              className="budget-bar-segment"
              style={{
                width: `${percentage}%`,
                backgroundColor: cat.color,
              }}
              title={`${cat.label}: ₹${value.toLocaleString()} (${Math.round(percentage)}%)`}
            />
          );
        })}
      </div>

      <div className="budget-categories">
        {categories.map((cat) => {
          const value = breakdown[cat.key] || 0;
          const percentage = Math.round((value / total) * 100);
          return (
            <div className="budget-category" key={cat.key}>
              <div className="category-left">
                <span className="category-dot" style={{ backgroundColor: cat.color }} />
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
              </div>
              <div className="category-right">
                <span className="category-amount">₹{value.toLocaleString()}</span>
                <span className="category-percent">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetBreakdown;
