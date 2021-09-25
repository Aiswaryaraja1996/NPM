var qrCode = require("qrcode");

const { Command } = require("commander");
const program = new Command();
program.version("0.0.1");

program
  .argument("<textForQrcode>", "Text to be converted to QR Code.")
  .option("-o, --outputFile <filename>", "QR code output file.", "QRcode_File")
  .action(function (textForQrcode, options, command) {
    qrCode.toFile(
      `./${options.outputFile}.png`,
      `${textForQrcode}`,
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
  });

program.parse(process.argv);
