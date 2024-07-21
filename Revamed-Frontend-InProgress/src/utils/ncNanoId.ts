export default function ncNanoId(prefix = "nc_") {
  return (
    prefix + Date.now() + "_" + Math.floor(Math.random() * 999999999999999)
  );
}
