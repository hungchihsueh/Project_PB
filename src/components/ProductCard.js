import * as React from "react";
import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

function ProductCard({
  productId,
  name,
  sold,
  rate,
  part,
  price,
  category,
  mainImage,
}) {
  useEffect(async () => {
    //抓商品圖片
    let pImages = await axios.get(
      `http://localhost:3001/product/images/${productId}`,
      {
        withCredentials: true,
      }
    );
    console.log(pImages);
  }, []);

  //對部位

  let bodyPart = {
    0: "綜合",
    1: "手部",
    2: "肩部",
    3: "胸部",
    4: "背部",
    5: "腿部",
  };
  //記數量
  const [number, setNumber] = useState(1);
  const handleCount = (i) => {
    if (i === 0) {
      if (number === 1) {
        return;
      }
      setNumber(number - 1);
    }
    if (i === 1) {
      setNumber(number + 1);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className={`card mx-5 mb-5`}>
        <div className="card__addCart p-0">
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <i className="fas fa-shopping-cart" />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            className="m-0"
          >
            <div className="poper p-3 d-flex justify-content-center flex-column">
              <div className=" poper__count__group d-flex justify-content-between align-items-center mb-3">
                <button
                  onClick={() => {
                    handleCount(0);
                  }}
                  className="btn poper__count__btn-m"
                >
                  -
                </button>
                <div className="mx-2">{number}</div>
                <button
                  onClick={() => {
                    handleCount(1);
                  }}
                  className="btn poper__count__btn-p"
                >
                  +
                </button>
              </div>
              <button className="btn poper__cart__btn">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </Popover>
        </div>
        <Link
          to={`/product-single/${category}/${productId}`}
          className="text-decoration-none"
        >
          {/* <div className="card__crown"><i className="fas fa-crown"></i></div>
                    <p className="card__ranking">1</p> */}

          <img
            src={`/product_images/${mainImage}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <div className="card__price">NT${price}</div>
            <h5 className="card-title">
              {name}
              <span className="card-title__star">
                {rate}
                <i className="fas fa-star"></i>
              </span>
            </h5>
            <div className="card__part">{bodyPart[part]}</div>
            <p className="card__sold text-end">售出{sold}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
