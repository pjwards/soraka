import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {DefinitionInterface} from '../types/domain/inteface/definition';

export type DefinitionModel = Aggregate<DefinitionInterface> &
    Document &
    Query<DefinitionInterface> &
    Model<Document> &
    DefinitionInterface;

/**
 * @swagger
 * tags:
 *   name: Definition
 *   description: Definition Model
 * definitions:
 *   Definition:
 *     type: object
 *     required:
 *        - learnData
 *     properties:
 *       learnData:
 *         type: LearnData
 *         description: Meaning Object
 */
const definitionSchema: Schema = new Schema({
    learnData: {type: Schema.Types.ObjectId, ref: 'learnData'},
}, {timestamps: true});


const Definition: Model<DefinitionModel> = model('Definition', definitionSchema);
export default Definition;
