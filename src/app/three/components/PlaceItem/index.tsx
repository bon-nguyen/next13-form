import { TPlace } from "../../page";

const PlaceItem = ({
  place,
  active,
  onClick,
}: {
  place: TPlace;
  active: number[];
  onClick: (id: number) => void;
}) => {
  return (
    <div
      key={place.id}
      className=" p-2 border-2 border-slate-400 inline-block w-auto"
    >
      <div className="inline-flex gap-2">
        <h3>{place.title}</h3>
        <button
          onClick={() => onClick(place.id)}
          className={`border bg-blue-200 px-2 ${
            active.includes(place.id) && "line-through"
          } `}
        >
          Complete
        </button>
        <div>Key: {place.id} </div>
      </div>
      {!active.includes(place.id) &&
        place.childPlaces.map((childPlace) => (
          <div key={childPlace.id} className="ml-5">
            <PlaceItem place={childPlace} onClick={onClick} active={active} />
          </div>
        ))}
    </div>
  );
};

export default PlaceItem;
