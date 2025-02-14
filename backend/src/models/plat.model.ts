import { Schema, model } from "mongoose";

export interface Plat {
    id: string;
    name: string;
    price: number;
    tags: string[];
    favourite: boolean;
    stars: number;
    imageUrl: string;
    origins: string[];
    cookTime: string;
}

export const PlatSchema = new Schema<Plat>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]},
        favourite: {type: Boolean, default: false},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        origins: {type: [String], required: true},
        cookTime: {type: String, required: true}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
);


export const PlatModel = model<Plat>('plat', PlatSchema); 
