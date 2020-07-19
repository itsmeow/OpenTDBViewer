import React from "react";
import SEO from "../components/seo";
import { Link } from "gatsby";

const Page404 = () => {
  return (
    <>
      <SEO title="404" />
      <main>
        <h1 align="center">Error 404: Page Not Found</h1>
        <Link
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          to="/"
        >
          Return Home
        </Link>
      </main>
    </>
  );
};
export default Page404;
