module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14284A",
        "primary-100": "rgba(20, 40, 74, .55)",
        "primary-300": "#2C4269",
        "primary-400": "#1F3459",
        secondary: "#2C62BF",
        active: "#537EC9",
        "link-active": "#0099FF",
      },
      width: {
        "slide-item": "34rem",
        sidebar: "15%",
        "sidebar-md": "30%",
        view: "85%",
        "view-md": "70%",
        "1/10": "10%",
        bar: "8%",
      },
      minWidth: {
        "slide-item": "34rem",
      },
      blur: {
        xs: "2px",
      },
      textColor: {
        description: "#AABFE4",
      },
      backgroundImage: {
        "card-hover":
          "linear-gradient(180deg, rgba(20, 40, 74, 0) 0%, rgba(20, 40, 74, 0.74) 28.04%, rgba(20, 40, 74, 0.97) 64.39%)",
        "playlist-container":
          "linear-gradient(199.02deg, #14284A 12.21%, rgba(20, 40, 74, 0) 87.41%)",
        "music-info":
          "linear-gradient(177.25deg, #0845AD 3.61%, #32486D 73%, #2C4269 97.83%)",
      },
      backgroundColor: {
        "list-hover": "rgba(37, 59, 98, 0.61)",
        overlay: "rgba(47, 69, 108, 0.83)",
        "overlay-gray": "rgba(107, 114, 128, .8)",
        "overlay-playlist-dark": "rgba(0, 0, 0, .25)",
        "overlay-dark": "rgba(29, 29, 29, 0.65)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      gridTemplateColumns: {
        playlist: "40px 3fr repeat(3, 2fr)",
        myplaylist: "40px 3fr repeat(2, 2fr)",
      },
    },
  },
  plugins: [],
};
