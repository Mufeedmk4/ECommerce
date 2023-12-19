import Order from "@/models/order";
import {initMongoose} from "../../lib/mongoose";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res){
    await initMongoose();
    const signingSecret = 'whsec_8367e81e8953ec51f507744b16afbc6426e259143811a9a6125c2cbed6577584';
    const payload = await buffer(req);
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);

  if (event?.type === 'checkout.session.completed') {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === 'paid') {
      await Order.findByIdAndUpdate(metadata.orderId, {paid:1});
    }
  }

  res.json('ok');
}

export const config = {
  api: {
    bodyParser: false,
  }
};