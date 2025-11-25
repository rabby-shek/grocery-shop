import { useEffect } from "react";

export default function LoadScripts() {
  useEffect(() => {
    const scripts = [
      "/assets/js/jquery-3.3.1.min.js",
      "/assets/js/bootstrap.min.js",
      "/assets/js/jquery.nice-select.min.js",
      "/assets/js/jquery-ui.min.js",
      "/assets/js/jquery.slicknav.js",
      "/assets/js/mixitup.min.js",
      "/assets/js/owl.carousel.min.js",
      "/assets/js/main.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // make sure order is preserved
      document.body.appendChild(script);
    });
  }, []);

  return null; // this component doesn't render anything
}
