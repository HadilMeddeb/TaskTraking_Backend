import { NotAuthorizedError, NotFoundError } from "@portail_entreprise/common";
import { WorkspaceMember } from "../../models/WorkspaceMember";
import { Request, Response } from "express";

interface MulterRequest extends Request {
  file: any;
}

//controllers
export const updateWorkspaceMemberController = async (
  req: Request,
  res: Response
) => {
  const workspaceMember = await WorkspaceMember.findById(req.params.id);
  console.log("workspaceMember :", workspaceMember);
  if (!workspaceMember) {
    throw new NotFoundError("workspaceMember");
  }
  workspaceMember.set(req.body);
  await workspaceMember.save();

  res.status(200).json({ workspaceMember });
};

export const getWorkspaceMemberController = async (
  req: Request,
  res: Response
) => {
  if (req.currentUser) {
    console.log("currentUser id :", req.currentUser.id);
    const workspaceMembers = await WorkspaceMember.find();
    console.log(workspaceMembers);
    const workspaceMember = await WorkspaceMember.findOne({
      user_id: req.currentUser.id.toString(),
    });
    console.log("workspaceMember :", workspaceMember);
    res.status(200).json({ workspaceMember });
  } else {
    throw new NotAuthorizedError();
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  console.log("avatar bodyyyyyyyyyyyyyyyyyyyyyyyyyy");
  //const { name , image } = req.body;
  //console.log("name :", name, "image :", image)

  /* const image_Path =
    "http://localhost:3000/images/" + (req as MulterRequest).file.filename; 

// Note: set path dynamically
  await WorkspaceMember.findOneAndUpdate(
    { id: req.params.id },
    {
      imagePath: image_Path,
    }
  ).then((data) => {
    res.status(200).json(data);
  });
  */
};

export const getWorkspaceMember = async (req: Request, res: Response) => {
  if (req.currentUser) {
    const workspaceMember = await WorkspaceMember.findOne({
      id: req.currentUser.id,
    });
    res.status(200).json(workspaceMember);
  }
};

export const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: Function
) => {
  console.log("listen listen eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  console.log("888888888888888888888888888888888888888888",(req as MulterRequest).file)
  const member = await WorkspaceMember.findByIdAndUpdate(
    req.params.id,
    { $set: { imagePath: (req as MulterRequest).file.filename } },
    { new: true }
  );
  console.log("member :",member)
  res.status(200).json(member)
};
