import { useCallback, useEffect, useRef, useState } from "react";
import useAsyncDebounce from "./useAsyncDebounce";

const useField = ({
  initialValue = "",
  initialTouched = false,
  initialDirty = false,
  initialMeta = {},
  initialValid = false,
  validate = () => false,
  validatePristine = false,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(initialTouched);
  const [isDirty, setDirty] = useState(initialDirty);
  const [meta, setMeta] = useState(initialMeta);
  const [isValid, setIsValid] = useState(initialValid);
  const [isValidating, setIsValidating] = useState(false);

  // Ref
  const apiRef = useRef<any>();
  const validationCountRef = useRef(0);
  const latestValidateRef = useRef();

  latestValidateRef.current = validate;

  const getInputProps = useCallback(
    (userProps = {}) => {
      return {
        value,
        onChange: (e) => {
          setDirty(true);
          setValue(e.target.value);
        },
        onBlur: () => setIsTouched(true),
        ...userProps,
      };
    },
    [value]
  );

  apiRef.current = {
    value,
    isTouched,
    isDirty,
    meta,
    isValid,
    isValidating,
    validationCount: validationCountRef.current,
    setValue,
    setDirty,
    setMeta,
    setIsValid,
    setIsValidating,
    getInputProps,
  };

  const debounce = useAsyncDebounce();

  apiRef.current.runValidation = useCallback(async () => {
    setIsValidating(true);
    const id = validationCountRef.current + 1;
    validationCountRef.current = id;

    const checkLatest = () => id === validationCountRef.current;

    const wrapForLatest =
      (fn) =>
      (...args) => {
        if (!checkLatest()) {
          return;
        }
        return fn(...args);
      };

    const error = await latestValidateRef.current({
      ...apiRef.current,
      setValue: wrapForLatest(apiRef.current.setValue),
      setDirty: wrapForLatest(apiRef.current.setDirty),
      setMeta: wrapForLatest(apiRef.current.setMeta),
      setValid: wrapForLatest(apiRef.current.setValid),
      debounce,
    });

    if (checkLatest()) {
      setIsValidating(false);
      if (typeof error !== "undefined") {
        if (error) {
          if (typeof error === "string") {
            setMeta((old) => ({ ...old, error }));
          }
          setIsValid(false);
        } else {
          setMeta((old) => ({ ...old, error: undefined }));
          setIsValid(true);
        }
      }
    }
  }, [debounce]);

  useEffect(() => {
    if (!validatePristine && !isDirty) {
      return;
    }

    apiRef.current.runValidation(value);
  }, [value, validatePristine, isDirty]);

  return apiRef.current;
};

export default useField;
