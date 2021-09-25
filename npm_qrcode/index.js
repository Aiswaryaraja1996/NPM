var qrCode = require("qrcode");

qrCode.toString(
  "https://github.com/Aiswaryaraja1996",
  { type: "terminal" },
  function (err, url) {
    console.log(url);
  }
);

qrCode.toFile(
  "./QRCode.png",
  "https://github.com/Aiswaryaraja1996",
  {
    color: {
      dark: "#00F", // Blue dots
      light: "#0000", // Transparent background
    },
  },
  function (err) {
    if (err) throw err;
    console.log("QR Code Generated!");
  }
);
