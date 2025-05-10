import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import { queryParam } from "../../utils/common";
import "./productLits.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductLits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState({
    limit: 10,
    total: 0,
    skip: 0, //offset
    list: [],
  });

  const fetchData = async (obj) => {
    setIsLoading(true);
    const payload = omit(obj, ["list", "total"]);
    const res = await fetch(
      `https://dummyjson.com/products?${queryParam(payload)}`
    ).then((res) => res.json());

    if (res?.products?.length > 0) {
      setProductList((prev) => {
        return {
          ...prev,
          list: res?.products || [],
          limit: res?.limit || 0,
          skip: res?.skip || 0,
          total: res?.total || 0,
        };
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(productList);
  }, []);
  return (
    <div className="product-list-container">
      <div className="card-grid">
        {productList?.list?.map((o, index) => {
          return (
            <div
              className="card-container"
              key={index}
              onClick={() => {
                navigate(`/product-details/${o?.id}`);
              }}
            >
              <div className="product-header">
                <div className="product-image">
                  <img src={o?.thumbnail} alt="image" />
                </div>
                <div className="product-name">{o?.title}</div>
                <div className="product-description">{o?.description}</div>
              </div>

              <div className="footer-card">
                <div className="product-price">
                  {o?.price ? `$${o?.price}` : ""}
                </div>
                <div>
                  <button
                    className="custom-button"
                    onClick={() => {
                      dispatch(addToCart(o));
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductLits;
