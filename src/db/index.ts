const createDB = () => {
  const db = new Map();
  db.set("users", []);

  // Added dummy product example as defined in task requirement
  db.set("products", [
    {
      id: "891389f0-4312-42d6-a650-6fda0959c734",
      title: "Book",
      description: "Interesting book",
      price: 200,
    },
  ]);

  db.set("carts", []);
  db.set("orders", []);

  return db;
};

const DB = createDB();

export default DB;
