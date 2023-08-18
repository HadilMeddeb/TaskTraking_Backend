import { NextFunction, Request, Response } from "express";

interface workspacePayload {
  id: string;
  name: string;
  idResponsable: string;
}

interface memberPayload {
    id: string;
    id_user: string;
    email: string;
  }
  
declare global {
  namespace Express {
    interface Request {
      currentWorkspace?: workspacePayload;
      currentMember?: memberPayload;
    }
  }
}

export const setcurrentWorkspaceMember = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentMember=req.query.currentMember as string;
  const currentWorkspace=req.query.currentWorkspace as string;
  console.log("currentWorkspace :", currentMember);
  console.log("currentMember :", currentWorkspace);
  
  /** other method **/
  if (!currentWorkspace|| ! currentMember) {
    return next();
  }
  try {
    req.currentMember = JSON.parse(currentMember);
    req.currentWorkspace =JSON.parse(currentWorkspace);
  } catch (err) {
    next();

  }
  return next();
};
