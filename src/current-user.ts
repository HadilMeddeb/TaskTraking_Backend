import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";

interface IAddress  {
  street: string;
  city: string;
  zip: string;
}

interface IDiplome  {
  _id:string,
  titre: string;
  faculte: string;
  date_obtention: Date;
}

interface IExperience  {
  _id:string,
  titre: string;
  societe: string;
  start_Date: Date;
  end_Date: Date;
  description: String;
}

interface IPoste  {
  titre: string;
  departement: string;
}


interface ProfileAttrs {
  user_id: string;
  fullname: string;
  birth_date: Date;
  tel: string;
  adress: IAddress;
  posteActuelle?: IPoste;
  diplomes: [IDiplome];
  competences: [string];
  experiences: [IExperience];
  linkedin: string;
  facebook: string;
  instagrame: string;
}


interface userPayload {
  id: string;
  email: string;
  role: string;
  username:string,
  profile:ProfileAttrs,
  status:string,
  exp:number
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** other method **/
  //console.log('heyyyyyyyyyyyyyyyyyyyyyyyy',req.query.auth)
 if(!req.query.auth)
  {
    console.log('heyyyyyyyyyyyyyyyyyyyyyyyy',req.query.auth)
    return next();
  }
  const auth=req.query.auth as string;
  try {
    console.log(" jwt.verify(auth, abgdhurmd)  ", jwt.verify(auth, "abgdhurmd") )
    const payload = jwt.verify(auth, "abgdhurmd") as userPayload;
    req.currentUser = payload;
  } catch (err)   
  {
    console.log("error :",err)
    next()
  }
  
   return next()
  }



/*
console.log("auth :",req.headers['auth'])
  if ((!req.session?.jwt)) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session?.jwt, "abgdhurmd") as userPayload;
    console.log("payload currentUser",payload)
    req.currentUser = payload;
  } catch (err) {
    next();
  }
  return next();
 
};
*/