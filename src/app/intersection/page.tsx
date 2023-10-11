"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

type TUser = {
  firstName: string;
  id: string;
  lastName: string;
  organizationId: string;
};

const InterSection = () => {
  const [items, setItems] = useState<TUser[]>([]);
  const [data, setData] = useState<TUser[]>([]);

  console.log("items", items);

  //   console.log("items", items);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  console.log("query", query);

  const addMoreItems = () => {
    const res = data.slice(
      (query.page - 1) * query.limit,
      query.page * query.limit
    );

    setItems(res);
  };

  useEffect(() => {
    setItems((prev) => {
      const res = data.slice(
        (query.page - 1) * query.limit,
        query.page * query.limit
      );
      console.log("data", res);
      return prev;
    });
  }, [query, data]);

  useEffect(() => {
    fetch("https://mocki.io/v1/d172b987-a068-4ba6-9ae0-a17e91973f10")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something when wrong");
      })
      .then((resJson) => {
        setData(resJson.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <h1>Inter section observer - infinite scroll</h1>
      <div className="relative bg-gray-300 p-2">
        {items.map((user) => (
          <div key={user.id} className="bg-white relative mb-2">
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <div onClick={() => setQuery((prev) => ({ ...prev, page: 1 }))}>1</div>
        <div onClick={() => setQuery((prev) => ({ ...prev, page: 2 }))}>2</div>
        <div onClick={() => setQuery((prev) => ({ ...prev, page: 3 }))}>3</div>
      </div>
    </div>
  );
};

export default InterSection;
