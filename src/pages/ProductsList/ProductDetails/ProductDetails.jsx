import React, { useEffect, useState } from "react";
import "./productDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/slice/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchDetails = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://dummyjson.com/products/${params?.id}`
    ).then((res) => res.json());

    if (res?.id) {
      setProductDetail(res);
    }
    setIsLoading(false);
  };

  const handleAddToCart = () => {
    if (productDetail?.id) {
      dispatch(addToCart({ ...productDetail, quantity }));
    }
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    fetchDetails();
  }, []);

  const styles = {
    container: {
      display: "flex",
      gap: "40px",
      padding: "40px",
      alignItems: "flex-start",
    },
    image: {
      width: "400px",
      borderRadius: "12px",
    },
    details: {
      maxWidth: "500px",
    },
    quantityBox: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "20px 0",
    },
    qtyBtn: {
      fontSize: "20px",
      padding: "6px 12px",
      background: "#ddd",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
    },
    qtyDisplay: {
      fontSize: "18px",
      minWidth: "30px",
      textAlign: "center",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="product-detail-ccontainer">
      <div style={styles.container}>
        <img
          src={productDetail?.thumbnail}
          alt={productDetail?.title}
          style={styles.image}
        />
        <div style={styles.details}>
          <h2>{productDetail?.title}</h2>
          <p>{productDetail?.description}</p>
          <h3>${productDetail?.price}</h3>

          <div style={styles.quantityBox}>
            <button onClick={handleDecrease} style={styles.qtyBtn}>
              –
            </button>
            <span style={styles.qtyDisplay}>{quantity}</span>
            <button onClick={handleIncrease} style={styles.qtyBtn}>
              +
            </button>
          </div>

          <div>
            <button className="custom-button" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
