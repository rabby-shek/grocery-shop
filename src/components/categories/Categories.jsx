import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/app",
});

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [index, setIndex] = useState(0);

  const itemsPerView = 4; // desktop

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(timer);
  }, [index, categories]);

  const fetchCategories = async () => {
    const res = await api.get("/get-all-categories");
    if (res.data.success) {
      setCategories(res.data.data);
    }
  };

  const next = () => {
    if (index < categories.length - itemsPerView) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <button onClick={prev} style={styles.navBtn}>‹</button>

        <div style={styles.window}>
          <div
            style={{
              ...styles.track,
              transform: `translateX(-${index * 25}%)`,
            }}
          >
            {categories.map((cat) => (
              <div key={cat._id} style={styles.item}>
                <div
                  style={{
                    ...styles.card,
                    backgroundImage: `url(http://localhost:8000${cat.image})`,
                  }}
                >
                  <h5 style={styles.title}>{cat.categoryName}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={next} style={styles.navBtn}>›</button>
      </div>
    </section>
  );
};

export default Categories;
const styles = {
  section: {
    padding: "40px 0",
  },
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  window: {
    overflow: "hidden",
    width: "100%",
  },
  track: {
    display: "flex",
    transition: "transform 0.5s ease",
  },
  item: {
    minWidth: "25%",
    padding: "0 10px",
    boxSizing: "border-box",
  },
  card: {
    height: "260px",
    borderRadius: "12px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "flex-end",
    padding: "15px",
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    background: "rgb(255, 255, 255)",
    padding: "6px 12px",
    borderRadius: "6px",
    margin: 0,
  },
  navBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background: "#000",
    color: "#fff",
    fontSize: "20px",
  },
};
