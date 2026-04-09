import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    key: {type: String, required: true, unique: true},
    url: {type: String, required: true}
});

export const UrlModel = mongoose.model('URL', urlSchema);