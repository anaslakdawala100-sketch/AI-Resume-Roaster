import React from "react";

export default function FeedbackCard({
  title,
  items,
  color = "blue",
}) {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    yellow: "border-yellow-500 text-yellow-600",
    red: "border-red-500 text-red-600",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border-l-4 ${colors[color]} p-6`}
    >
      <h2 className={`text-2xl font-bold mb-4 ${colors[color]}`}>
        {title}
      </h2>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-gray-700"
          >
            <span className="text-green-500 text-xl">✔</span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}