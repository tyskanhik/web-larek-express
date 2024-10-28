import { model, Schema } from 'mongoose';

export interface IProduct {
    title: string,
    image: {
        fileName: string,
        originalName: string
    },
    category: string,
    description?: string,
    price?: number
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: true,
    },
    image: {
        fileName: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
        default: null,
    },
});

export default model<IProduct>('product', productSchema);
