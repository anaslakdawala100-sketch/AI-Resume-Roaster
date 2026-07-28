export default function ProgressBar({
  title,
  value,
  color = "bg-blue-600",
}) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span className="font-semibold">
          {title}
        </span>

        <span>
          {value}%
        </span>

      </div>

      <div className="w-full bg-gray-300 rounded-full h-4">

        <div
          className={`${color} h-4 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>

      </div>

    </div>
  );
}