import React from "react";
import CountUp from "react-countup";

const StatsCounter = () => {
  return (
    <section className="stats-counter flex justify-around bg-gray-100 p-8 rounded-lg my-8 text-center">
      <div>
        <CountUp end={1250} duration={3} separator="," />
        <p>Meals Served</p>
      </div>
      <div>
        <CountUp end={300} duration={3} />
        <p>Students Registered</p>
      </div>
      <div>
        <CountUp end={850} duration={3} separator="," />
        <p>Reviews Posted</p>
      </div>
      <div>
        <CountUp end={4200} duration={3} separator="," />
        <p>Likes Given</p>
      </div>
    </section>
  );
};

export default StatsCounter;
