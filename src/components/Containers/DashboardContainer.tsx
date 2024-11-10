interface DashboardContainerProps {
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardContainer({
  title,
  description,
  actionButton,
  children,
}: DashboardContainerProps) {
  return (
    <div className="p-6 space-y-6 my-5">
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              )}
            </div>
            {actionButton && actionButton}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
