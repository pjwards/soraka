import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {DefinitionInterface} from '../types/domain/inteface/definition';

export type DefinitionModel = Aggregate<DefinitionInterface> &
    Document &
    Query<DefinitionInterface> &
    Model<Document> &
    DefinitionInterface;

const definitionSchema: Schema = new Schema({
    learnData: {type: Schema.Types.ObjectId, ref: 'learnData'},
}, {timestamps: true});


const Definition: Model<DefinitionModel> = model('Definition', definitionSchema);
export default Definition;
