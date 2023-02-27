export const productId = [
  {
    id: 1,
    productName: "Sparkplug",
  },
  {
    id: 2,
    productName: "SIFS",
  },
  {
    id: 3,
    productName: "VCT",
  },
  {
    id: 4,
    productName: "O2Sensor",
  },
  {
    id: 5,
    productName: "Alternator",
  },
  {
    id: 6,
    productName: "Stater",
  },
  {
    id: 7,
    productName: "Acgs",
  },
  {
    id: 8,
    productName: "WSS",
  },
  {
    id: 8,
    productName: "Meter",
  },
  {
    id: 9,
    productName: "ECU",
  },
  {
    id: 10,
    productName: "AISS",
  },
];

export const lineID = [
  {
    lineId: 1,
    lineName: "Center Electrode",
    productId: productId[0].id,
  },
  {
    lineId: 2,
    lineName: "Housing",
    productId: productId[0].id,
  },
  {
    lineId: 3,
    lineName: "Final Assy",
    productId: productId[0].id,
  },
  {
    lineId: 4,
    lineName: "Insulator",
    productId: productId[0].id,
  },
];

export const processId = [
  {
    processId: 1,
    lineId: lineID[0].lineId,
    processName: "Center Elctrode",
  },
  {
    processId: 2,
    lineId: lineID[0].lineId,
    processName: "Insulator",
  },
  {
    processId: 3,
    lineId: lineID[0].lineId,
    processName: "Final Assy",
  },
  {
    processId: 4,
    lineId: lineID[0].lineId,
    processName: "Stator",
  },
  {
    processId: 5,
    lineId: lineID[0].lineId,
    processName: "Rotor",
  },
];

export const productName = [
  "sparkplug",
  "sifs",
  "vct",
  "o2sensor",
  "alternator",
  "stater",
  "acgs",
  "wss",
  "meter",
  "ecu",
  "aiss",
];

export const productList = [
  {
    No: 1,
    product: productName[0],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "sparkplugdenso",
  },
  {
    No: 2,
    product: productName[1],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "SIFS",
  },
  {
    No: 3,
    product: productName[2],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "vct denso",
  },
  {
    No: 4,
    product: productName[3],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "O2Sensor",
  },
  {
    No: 5,
    product: productName[4],
    description: "",
    imgUrl: "alternator",
  },
  {
    No: 6,
    product: productName[5],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "starter2",
  },
  {
    No: 7,
    product: productName[6],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "acgs denso",
  },
  {
    No: 8,
    product: productName[7],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "acgs denso",
  },
  {
    No: 9,
    product: productName[8],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "acgs denso",
  },
  {
    No: 10,
    product: productName[9],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "acgs denso",
  },
  {
    No: 11,
    product: productName[10],
    description:
      "Adalah Product yang berfungsi untuk memantikan api di sistem pembakaran",
    imgUrl: "acgs denso",
  },
];

export const documentMenu = [
  {
    no: "1",
    type: "pcs",
    keyword: "Process Control Sheet",
    decription:
      " merupakan document yang berisikan standard standard dari setiap process",
  },
  {
    no: "2",
    type: "qa net",
    keyword: "Quality Assurance Network",
    decription:
      " merupakan document yang berisikan jaring jaring pengaman product cacat dimana product cacat dapat terdetaksi",
  },
  {
    no: "3",
    type: "pfmea",
    keyword: "Process Failure Mode Effect Analysis",
    decription:
      " merupakan document yang berisikan mode kegagalan pada level atau skala berapakah product cacat tersebut terjadi",
  },
  {
    no: "4",
    type: "approval document",
    decription: " List Document yang Sudah di Ajukan untuk Process Approval",
  },
];

export const dashboardList = [
  {
    img: "document.jpg",
    link: "/home",
    title: "Engineering Document Centralization",
    bodyDescription: "Make easier to approve document engineering",
    pDescription: "as e-approval and centralize standard document",
  },
  {
    img: "budget.jpg",
    link: "/dashboard-budget",
    title: "PE Budgeting System (Cooming soon)",
    bodyDescription: "Make easier to check and controling budget",
    pDescription: "as realtime budget controlling PE ",
  },
  {
    img: "overtime.jpg",
    title: "Overtime Controlling (Cooming soon)",
    bodyDescription: "Make easier to check and controling of mp overtime",
    pDescription: "as realtime overtime controlling PE ",
  },
  {
    img: "planning.jpg",
    title: "Project Planning (Cooming soon)",
    bodyDescription: "Make easier to check and controling of PE Project",
    pDescription: "as realtime progress and review project",
  },
];
