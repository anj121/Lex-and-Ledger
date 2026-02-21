import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServiceCategoryGrid = ({ serviceCategories }) => {
  const [expanded, setExpanded] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);

  const toggleCategory = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleCategories = showAllCategories
    ? serviceCategories
    : serviceCategories.slice(0, 6);

  return (
    <section className="bg-[#0f172a] text-white ">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleCategories.map((category) => {
            const isExpanded = expanded[category.id];
            const visibleServices = isExpanded
              ? category.services
              : category.services.slice(0, 5);
            return (
              <div key={category.id}>
                <h3 className="text-white-600 text-lg font-semibold mb-1">
                  {category.title}
                </h3>
                <hr className="border-white-600 w-12 mb-4" />

                <ul className="space-y-2 text-sm text-gray-200">
                  {visibleServices.map((service, idx) => (
                    <li key={idx}>
                      <Link
                        to={
                          category.id === "immediate"
                            ? "/immediate-service"
                            : `/getStarted/${category.id}/${service.id}`
                        }
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}

                  {category.services.length > 5 && (
                    <li>
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="text-xs text-white-600 hover:underline mt-1"
                      >
                        {isExpanded
                          ? "Show Less"
                          : `+${category.services.length - 5} more`}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="px-6 py-2 text-white-600 border border-white-600 rounded-full hover:bg-white-600 hover:text-white transition"
          >
            {showAllCategories ? "See Less" : "See More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoryGrid;
