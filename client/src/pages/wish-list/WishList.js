import React, { useEffect, useState } from "react";
import axios from "axios";
import "./wishlist.css";
import Message from "./Message";
import Loading from "../../components/loading/Loading";

function WishList() {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/wishlist")
      .then((res) => setWishList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const deleteList = async (row) => {
    try {
      const res = await axios.delete(`/api/user/wishlist/${row.id}`);
      setWishList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (wishList.length === 0) return <Message />;

  return (
    <div className="wishlist-container">
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {wishList.map((row) => (
            <tr key={row.id} className="row">
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${row.poster_path}`}
                  alt={`${row.title} poster`}
                />
              </td>
              <td>{row.title}</td>
              <td className="overview">{row.overview}</td>
              <td>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => deleteList(row)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WishList;
