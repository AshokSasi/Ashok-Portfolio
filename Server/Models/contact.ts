/*
Name: Ashok Sasitharan 100745484, Jacky Yuan 100520106
Date: April 13 2021
File: contacts.ts
*/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema
({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String
},
{
    collection: "contacts"
});

 const Model = mongoose.model("Contact", ContactSchema);
 export default Model;

