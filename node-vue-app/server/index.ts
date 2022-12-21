import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { SetuUPIDeepLink } from "@setu/upi-deep-links";
import "dotenv/config.js";

const whitelist: string[] = [];
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: true, credentials: true }));
} else {
  app.use(cors(corsOptions));
}
app.get("/", (req, res) => {
  res.json({ msg: "HELLO FROM AVINASH" });
});
const schemeID = process.env.SCHEME_ID || "";
const secret = process.env.SECRET || "";
const productID = process.env.PRODUCT_ID || "";
app.post("/upi-pay", async (req, res) => {
  const { price, id } = req.body;
  const upidl = SetuUPIDeepLink({
    schemeID,
    secret,
    productInstanceID: productID,
    mode: "SANDBOX",
    authType: "JWT",
  });
  try {
    const paymentLinkResponse = await upidl.createPaymentLink({
      amountValue: price * 100,
      billerBillID: id,
      amountExactness: "EXACT",
    });
    res.status(200).json({ paymentLinkResponse });
  } catch (error) {
    res.status(400).json({
      message: "Some Problems with UPI",
      error,
    });
  }
});
app.post("/mock-payment", async (req, res) => {
  const { response, price } = req.body;
  const upidl = SetuUPIDeepLink({
    schemeID,
    secret,
    productInstanceID: productID,
    mode: "SANDBOX",
    authType: "JWT",
  });
  try {
    console.log(response, price, "PPRRPRPRPRs");
    const data = await upidl.triggerMockPayment({
      amountValue: price * 100,
      vpa: response.paymentLink.upiID,
      platformBillID: response.platformBillID,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: "Some Problems with UPI",
      error,
    });
  }
});

app.use((_, res, _2) => {
  res.status(404).json({ error: "NOT FOUND" });
});

app.listen(port, () => {
  console.log("server started on port " + port);
});
