import { useEffect, useState } from "react";

const MainComponent = () => {
  const stats = [
    { title: "Total Images", count: 120 }, // soft blush pink
    { title: "Total Videos", count: 45 }, // soft aqua
    { title: "Total PDFs", count: 34 }, // light lavender
    { title: "Total Files", count: 199 }, // light lemon green
  ];

  const StatCard = ({ title, count, bgColor }) => {
    return (
      <div className="col-md-6 col-lg-3 mb-4">
        <div
          className="card shadow-sm rounded-4 p-3 border-0"
          style={{ backgroundColor: "#ffe4e1" }}
        >
          <div className="card-body text-center">
            <h5 className="card-title fw-semibold text-dark">{title}</h5>
            <p className="display-6 fw-bold color-dark-red">{count}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container my-2">
        <h2 className="mb-4 fw-bold text-muted">Dashboard</h2>
        <div className="row">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              count={item.count}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
