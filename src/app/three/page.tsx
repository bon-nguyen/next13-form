"use client";

import { useEffect, useState } from "react";
import PlaceItem from "./components/PlaceItem/index";
import { initialTravelPlan } from "./data";

export type TPlace = {
  id: number;
  title: string;
  childPlaces: TPlace[];
};

const Three = () => {
  const [data, setData] = useState<TPlace[]>([]);
  const [isActionKey, setIsActionKey] = useState<number[]>([]);

  useEffect(() => {
    setData(initialTravelPlan.childPlaces);
  }, []);

  const handleActiveKey = (key: number) => {
    setIsActionKey((prev: number[]) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      }
      return [...prev, key];
    });
  };

  return (
    <div className="w-full flex flex-col">
      {data.map((place) => (
        <PlaceItem
          key={place.id}
          place={place}
          onClick={handleActiveKey}
          active={isActionKey}
        />
      ))}
    </div>
  );
};

export default Three;
