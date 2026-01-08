import { useEffect, useState, useContext } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    fetch("http://3.7.69.74:8000/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || r.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🍽 Restaurants</h1>

      {/* Search & Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        >
          <option value="All">All</option>
          <option value="Pizza">Pizza</option>
          <option value="Cafe">Cafe</option>
          <option value="North Indian">North Indian</option>
        </select>

        <a href="/checkout" style={{ marginLeft: "20px" }}>🛒 Go to Checkout</a>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && filteredRestaurants.length === 0 && <p>No restaurants found.</p>}

      <div style={{ display: "grid", gap: "12px" }}>
        {filteredRestaurants.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              background: "#fafafa"
            }}
          >
            <h3>{r.name}</h3>
            <p>⭐ Rating: {r.rating}</p>
            <p>⏱ Time: {r.time}</p>
            <p>🎁 Offer: {r.offer}</p>
            <p>🍴 Category: {r.category}</p>

            <button
              onClick={() => addItem(r)}
              style={{
                marginTop: "8px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#222",
                color: "white",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

