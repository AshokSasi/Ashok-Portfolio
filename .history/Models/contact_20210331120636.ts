import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContactSchema = new Schema({
    FullName:String,
    EmailAddress:String,
    ContactNumber: String

});