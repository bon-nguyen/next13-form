"use client";

import useField from "@/hooks/useField";
import FieldMeta from "./components/FieldMeta";

const Page = () => {
  const name = useField({
    validate: (item) => {
      return !item.value || !item.value.length ? "Required" : false;
    },
  });

  return (
    <div>
      <div>
        <label>Name</label>
        <input
          {...name.getInputProps({
            className: "border",
          })}
        />
        <div>
          <small>{`(Try your name, then delete your name)`}</small>
        </div>
        <FieldMeta field={name} />
      </div>

      <div>
        <label>Name</label>
      </div>
    </div>
  );
};

export default Page;
