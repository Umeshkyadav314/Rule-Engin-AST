import { Schema, model } from 'mongoose';

const ruleSchema = new Schema({
    inputString: {
        type: String,
        required: true, // Ensure that inputString is always provided
    },
    ast: {
        type: Object, // Store the AST as an object
        required: true, // Ensure that ast is always provided
    },
});

// Create a model from the schema
const Rule = model('Rule', ruleSchema);

export default Rule;
