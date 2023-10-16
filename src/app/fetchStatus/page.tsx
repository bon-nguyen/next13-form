"use client";
import axios from "../../../node_modules/axios/index";
import { useState, useEffect } from "react";

const STATUS = {
  IDLE: "IDLE",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
};

const fetchStatus = () => {
  const [data, setData] = useState<any>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isSuccess, setIsSuccess] = useState(false);
  //   const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);

  const fetchData = async () => {
    try {
      setStatus(STATUS.LOADING);
      const res = await axios.get("https://dummyjson.com/products");
      if (res?.data) {
        setStatus(STATUS.SUCCESS);
        setData(res.data.products);
      }
    } catch (error) {
      setData(STATUS.ERROR);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (status === STATUS.LOADING) return <div>Is Loading</div>;
  if (status === STATUS.ERROR) return <div>Some thing when wrong</div>;

  return (
    <div className="container m-auto">
      <div className="flex flex-wrap gap-4">
        {STATUS.SUCCESS &&
          data.map((product: any) => (
            <div key={product.id} className="w-20 h-20 bg-orange-600">
              <div>{product.title}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default fetchStatus;
