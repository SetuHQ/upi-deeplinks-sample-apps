import 'express-async-errors';

import { PrismaClient } from '@prisma/client';
import { SetuUPIDeepLink } from '@setu/upi-deep-links';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import express, { json } from 'express';
import helmet from 'helmet';

dotenv.config();

const app = express();
app.use(json());
app.use(helmet());

const prisma = new PrismaClient();

app.get('/', (_, res) => {
  res.json({
    msg: 'Hello World',
  });
});

app.get('/products', async (_, res) => {
  try {
    const productsData = await prisma.products.findMany();
    res.status(200).json({ productsData });
  } catch (error) {
    res.status(400).json({
      message: 'Could not get the products data',
      error,
    });
  }
});
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({
      message: 'Could not get the products data',
      error,
    });
  }
});
const schemeID = process.env.schemeID || '';
const secret = process.env.secret || '';
const productID = process.env.productID || '';
app.post('/upi-pay', async (req, res) => {
  const { id } = req.body;
  const upidl = SetuUPIDeepLink({
    schemeID,
    secret,
    productInstanceID: productID,
    mode: 'SANDBOX',
    authType: 'JWT',
  });
  try {
    const product = await prisma.products.findUnique({
      where: {
        id,
      },
    });
    const paymentLinkResponse = await upidl.createPaymentLink({
      amountValue: (product?.productPrice as number) * 100,
      billerBillID: id,
      amountExactness: 'EXACT',
    });
    res.status(200).json({ paymentLinkResponse });
  } catch (error) {
    res.status(400).json({
      message: 'Some Problems with UPI',
      error,
    });
  }
});
app.post('/mock-payment', async (req, res) => {
  const { id, UPIResponse } = req.body;
  const upidl = SetuUPIDeepLink({
    schemeID,
    secret,
    productInstanceID: productID,
    mode: 'SANDBOX',
    authType: 'JWT',
  });
  try {
    const product = await prisma.products.findUnique({
      where: {
        id,
      },
    });
    const data = await upidl.triggerMockPayment({
      amountValue: (product?.productPrice as number) * 100,
      vpa: UPIResponse.paymentLink.upiID,
      platformBillID: UPIResponse.platformBillID,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: 'Some Problems with UPI',
      error,
    });
  }
});

app.get('/prisma', async (_, res) => {
  await prisma.user.create({
    data: {
      email: 'random@example.com',
    },
  });

  res.json({
    msg: 'Add a new unique user without duplicate',
  });
});

app.use((_, res, _2) => {
  res.status(404).json({ error: 'NOT FOUND' });
});

export { app };
