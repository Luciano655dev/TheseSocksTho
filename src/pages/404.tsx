import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        height: "85vh",
      }}
    >
      <h1 style={{ margin: "1em" }}>Page not Found</h1>
      <div>
        <Link
          to={"/"}
          style={{
            padding: "2em",
            color: "black",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          Home
        </Link>
        <Link
          to={"/shop"}
          style={{
            padding: "2em",
            color: "black",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          Shop
        </Link>
      </div>
    </div>
  )
}
