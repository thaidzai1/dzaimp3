const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema ({
    test: String
})

mongoose.model('tests', testSchema);
