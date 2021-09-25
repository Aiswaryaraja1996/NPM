var inquirer = require("inquirer");

console.log("-----------Welcome to My Kitchen----------------");
console.log(" ");
console.log("Fill your details to continue ...");

async function restaurant() {
  const userDetails = await inquirer.prompt([
    {
      type: "input",
      message: "Enter Username : ",
      name: "userName",
    },
    {
      type: "password",
      message: "Enter Password : ",
      mask: "*",
      name: "password",
    },
    {
      type: "input",
      message: "Phone Number : ",
      name: "phone",
      validate(value) {
        const phone = value.length === 10;
        if (phone) {
          return true;
        } else {
          return "Please enter a valid phone number";
        }
      },
    },
  ]);

  console.log(" ");
  console.log(`Welcome to my kitchen , ${userDetails.userName} !!`);
  console.log(" ");

  const deliveryDetails = await inquirer.prompt([
    {
      type: "list",
      message: "Choose mode of delivery",
      name: "delivery",
      choices: ["Pick Up", "Home Delivery"],
    },
  ]);

  if (deliveryDetails.delivery === "Home Delivery") {
    const getAdd = await inquirer.prompt([
      {
        type: "input",
        name: "address",
        message: "Enter your location details : ",
      },
    ]);
  }

  const getOrderDetails = await getOrder();

  const getBill = await getPrice(getOrderDetails);

  const generateBill = await getTotal(getBill);
}

function getOrder() {
  console.log(" ");

  const orderList = inquirer.prompt([
    {
      type: "checkbox",
      message: "Pick your favourite food",
      name: "order",
      choices: [
        new inquirer.Separator("----- Starters ------"),
        { name: "Gobi Fry       (Rs.88)" },
        { name: "Chicken 65     (Rs.92)" },
        new inquirer.Separator("----- Main Courses ------"),
        { name: "Chicken Biriyani       (Rs.220)" },
        { name: "Veg Pulao              (Rs.120" },
        new inquirer.Separator("----- Desserts ------"),
        { name: "Gulab Jamun        (Rs.20)" },
        {
          name: "Mixed Fruits Custard       (RS.35)",
        },
      ],
    },
  ]);

  return orderList;
}

async function getPrice(oList) {
  var arr = oList.order;
  var billList = [];

  for (var i = 0; i < arr.length; i++) {
    var bill = {};
    var qtyDetails = await inquirer.prompt([
      {
        type: "input",
        message: `Enter the quantity for ${arr[i].split("(")[0].trim()} : `,
        name: "qty",
      },
    ]);

    bill.item = arr[i].split("(")[0].trim();
    bill.price =
      Number(arr[i].split("(")[1].split(".")[1].split(")")[0]) *
      Number(qtyDetails.qty);
    billList.push(bill);
  }

  return billList;
}

function getTotal(list) {
  //   console.log(list);
  console.log();
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getDate() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getFullYear();
  console.log("--------------------------------------------------");
  console.log(`My Kitchen --- Total Bill --- Date : ${formatted_date} `);
  console.log("--------------------------------------------------");
  var sum = 0;
  console.log();
  for (var j = 0; j < list.length; j++) {
    sum = sum + Number(list[j].price);
    console.log(`${list[j].item}    Rs.${list[j].price}`);
  }
  console.log("--------------------------------------------------");
  console.log(`Total                Rs.${sum}`);
  console.log(`GST(5%)              Rs.${sum * (5 / 100)}`);
  console.log("--------------------------------------------------");
  console.log(`Grand Total          Rs.${sum + sum * (5 / 100)}`);

  console.log("--------------------------------------------------");
  console.log("Thank you for visiting !!");
}

restaurant();
