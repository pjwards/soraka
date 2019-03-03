import mongoose from 'mongoose';
import {DefinitionInterface} from "../types/domain/inteface/definition";

export type DefinitionModel = mongoose.Document & DefinitionInterface;

const definitionSchema = new mongoose.Schema({
    learnData: {type: mongoose.Schema.Types.ObjectId, ref: 'learnData'},
}, { timestamps: true });


const Definition = mongoose.model('Definition', definitionSchema);
export default Definition;
