/*
Name: Ashok Sasitharan 100745484, Jacky Yuan 100520106
Date: April 13 2021
File: index.ts
*/
import express, {Request, Response, NextFunction} from 'express';

import passport from 'passport';

// Contact Model
import Contact from "../Models/contact";

//import User Model 
import User from '../Models/user';

//import Util Function
import {UserDisplayName} from  "../Util/index";

// ************************************************DISPLAY PAGE FUNCTIONS************************************************

/**
 *Displays the home page 
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayHomePage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)    });
}
/**
 *Displays the about page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayAboutPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about',displayName: UserDisplayName(req)       });
}

/**
 *Displays the services page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayServicesPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services',displayName: UserDisplayName(req)      });
}

/**
 *Displays the project page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayProjectsPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects',displayName: UserDisplayName(req)      });
}

/**
 *Displays the Contact us page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact',displayName: UserDisplayName(req)      });
}
/**
 *Displays the login page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}  {void}
 */
export function DisplayLoginPage(req:Request, res:Response, next:NextFunction): void
{
    if(!req.user)
    {
       return res.render('index', 
       {  
            title: 'Login', 
            page: 'login', 
            messages:req.flash('loginMessage'),
            displayName: UserDisplayName(req)   
        });
    }
    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', 
            { 
            title: 'Register',
             page: 'register', 
             messages:req.flash('registerMessage'),
             displayName: UserDisplayName(req)    
            });
    }
    return res.redirect('/contact-list');
}

//Process page functions
export function ProcessLoginPage(req:Request, res:Response, next:NextFunction): void
{

    passport.authenticate('local',(err,user,info) =>{
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        //are there login errors?
        if(!user)
        {
            req.flash('loginMessage', "Authentication Error");
            return res.redirect('/login');
        }
        req.login(user,(err) =>{
            //are there database errors
            if(err)
            {
                console.error(err);
                return next(err);
            }

            return res.redirect('/contact-list');
            
        });
    })(req,res,next);

}

export function ProcessLogoutPage(req:Request, res:Response, next:NextFunction): void
{
   req.logout();
   console.log("User Logged Out");
   res.redirect('/login');
}

export function ProcessRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    //instantiate a new user object 
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName

    });
    User.register(newUser, req.body.password,(err) =>
    {
        if(err){
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                console.error('Error: User Already Exists');
            }
            return res.redirect('/register');
        }

        // automatically login the user
        return passport.authenticate('local')(req,res,()=>
        {

            return res.redirect('/contact-list');
        });
    });
}

export function ProcessContactPage(req:Request, res:Response, next:NextFunction): void
{

        // instantiate a new Contact
      let newContact = new Contact
      ({
        "FullName": req.body.FullName,
        "ContactNumber": req.body.ContactNumber,
        "EmailAddress": req.body.EmailAddress
      });
    
      // db.contacts.insert({contact data is here...})
      Contact.create(newContact, (err) => {
        if(err)
        {
          console.error(err);
          res.end(err);
        }
    
        res.redirect('/home');
      });

}