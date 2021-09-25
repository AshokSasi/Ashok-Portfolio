/*
Name: Ashok Sasitharan 100745484, Jacky Yuan 100520106
Date: April 13 2021
File: index.ts
*/
// Express Configuration
import express from 'express';
const router = express.Router();
export default router;

// Contact Model
import Contact from "../Models/contact";

// Create an Index Controller Instance
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayProjectsPage, 
  DisplayRegisterPage, DisplayServicesPage, ProcessContactPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from "../Controllers/index";

/* GET home page - with / */
router.get('/', DisplayHomePage);


/* GET home page - with /home */
router.get('/home', DisplayHomePage);


/* GET about page - with /about */
router.get('/about', DisplayAboutPage);


/* GET services page - with /services */
router.get('/services', DisplayServicesPage);


/* GET projects page - with /projects */
router.get('/projects', DisplayProjectsPage);


/* GET contact page - with /contact */
router.get('/contact', DisplayContactPage);


/* GET login page - with /login */
router.get('/login', DisplayLoginPage);


/* GET register page - with /register */
router.get('/register', DisplayRegisterPage);

/********************** temporary routes - for authentication **********************/

/* Process login page - with /login */
router.post('/login', ProcessLoginPage);


/* Process logout page - with /logout */
router.get('/logout', ProcessLogoutPage);

/* Process login page - with /login */
router.post('/register', ProcessRegisterPage);

router.post('/contact', ProcessContactPage);
