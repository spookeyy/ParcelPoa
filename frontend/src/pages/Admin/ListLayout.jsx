import React from "react";

export default function ListLayout({ title, filterBar, children }) {
  return (
    <div className="p-6 bg-gray-50 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>
      {filterBar}
      <div className="overflow-x-auto flex-grow">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
