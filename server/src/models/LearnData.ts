import mongoose from 'mongoose';
import {LearnDataInterface} from '../types/domain/inteface/learnData';

export type LearnDataModel = mongoose.Document & LearnDataInterface;

const learnDataSchema = new mongoose.Schema({
    lastLearningDate: Date,
    learnCount: Number,
    correctCount: Number,
    incorrectCount: Number,
    favorite: Boolean,
}, { timestamps: true });


const LearnData = mongoose.model('LearnData', learnDataSchema);
export default LearnData;
