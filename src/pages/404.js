import React from "react";
import SEO from "../components/seo";

const Page404 = () => {
  return (
    <>
      <SEO title="404" />
      <main>
        <h1 align="center">Error 404: Page Not Found</h1>
        <button
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => {
            if (window !== undefined) {
              window.location.href = window.location.origin;
            }
          }}
        >
          Return Home
        </button>
      </main>
    </>
  );
};
export default Page404;
