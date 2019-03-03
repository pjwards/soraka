import mongoose from 'mongoose';
import {CardInterface} from "../types/domain/inteface/card";

export type CardModel = mongoose.Document & CardInterface;

const cardSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    word: {type: mongoose.Schema.Types.ObjectId, ref: 'definition'},
    meanings: [{type: mongoose.Schema.Types.ObjectId, ref: 'definition'}],
}, { timestamps: true });


const Card = mongoose.model('Card', cardSchema);
export default Card;