import React from "react";
import "./wishlist.css";
import Message from './Message'

function WishList(props) {
  const { wishList, setWishList } = props;

  const deleteList = row => {
    const index = wishList.findIndex((item) => item.id === row.id);

    const newArr = [...wishList];
    // console.log(newArr);

    if (index === -1) {
      console.log("not found");
    } else {
      if (index !== -1) {
        newArr.splice(index, 1);
        // console.log(newArr);
        setWishList(newArr);
      }
    }
  };

  return wishList.length === 0 ? (
    <Message />
  ) : (
    <div className="wishlist-container">
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        {wishList.map((row) => {
          return (
            <tbody key={row.id}>
              <tr className="row">
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
                    class="fas fa-trash-alt"
                    onClick={() => deleteList(row)}
                  ></i>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default WishList;
