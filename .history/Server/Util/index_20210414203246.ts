/*
Name: Ashok Sasitharan 100745484, Jacky Yuan 100520106
Date: April 13 2021
File: index.ts
*/
import express, {Request, Response, NextFunction} from 'express';

/**
 *Gets the user's display name and returns it in string format
 *
 * @export
 * @param {Request} req
 * @return {*}  {String}
 */
export function UserDisplayName(req:Request): String
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.displayName.toString();

    }
    return '';
}

export function AuthGuard(req:Request, res: Response, next: NextFunction):void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}