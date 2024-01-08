const FieldMeta = ({ field }) => {
  const {
    isValidating,
    meta: { error, message },
  } = field;

  return (
    <>
      <span>
        {isValidating ? (
          <span style={{ color: "orange" }}>Checking...</span>
        ) : error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : message ? (
          <span style={{ color: "green" }}>{message}</span>
        ) : null}
      </span>
      <pre>
        <code>{JSON.stringify(field, null, 2)}</code>
      </pre>
    </>
  );
};

export default FieldMeta;
