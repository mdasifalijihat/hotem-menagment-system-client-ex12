const MealOfTheDay = ({ meal }) => {
  return (
    <section className="my-8 bg-orange-50 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">🍽️ Meal of the Day</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full md:w-1/2 h-60 object-cover rounded-lg"
        />
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold">{meal.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
          <p className="font-medium">Rating: ⭐ {meal.rating.toFixed(1)}</p>
          <p className="text-sm text-gray-500 mt-2">Posted by: {meal.distributor}</p>
        </div>
      </div>
    </section>
  );
};

export default MealOfTheDay;
