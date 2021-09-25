/*
Name: Ashok Sasitharan 100745484, Jacky Yuan 100520106
Date: April 13 2021
File: contact-list.ts
*/

// Express Configuration
import express from 'express';
import {DisplayAddPage, DisplayContactListPage, DisplayEditPage, ProcessAddPage,
     ProcessDeletePage, ProcessEditPage} from '../Controllers/contact-list';
const router = express.Router();
export default router;


/* GET contact-list page - with /contact-list */
router.get('/', DisplayContactListPage);


/* Display edit/:id page - with /edit/:id */
router.get('/edit/:id',DisplayEditPage);

/* Display add page - with /add */
router.get('/add', DisplayAddPage);


/* Process add/:id page - with /add*/
router.post('/add', ProcessAddPage);

/* Process edit/:id page - with /edit/:id */
router.post('/edit/:id', ProcessEditPage);

/* Process delete/:id page - with /delete/:id */
router.get('/delete/:id', ProcessDeletePage);