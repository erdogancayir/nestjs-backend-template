// api/src/orders/schemas/order.schema.ts
import * as mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, // Order date
    time: String, // Order time
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // Other order details...
});

export { OrderSchema };
