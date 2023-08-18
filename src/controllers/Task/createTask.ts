import { BadRequestError } from "@portail_entreprise/common";
import axios from "axios";
import { Response, Request } from "express";
import { configData } from "../../config/ConfigData";
import { IFile } from "../../extra/file";
import { AssociationCollaboratorMember } from "../../models/AssociationCollaboratorMember";
import { CheckList } from "../../models/CheckLIst";
import { Task } from "../../models/Task";
import { UnderTask } from "../../models/underTask";

const baseURL = "https://api.trello.com/1/";
const key = "88527dd61ad373184107a66b06091a9d";
const token =
  "ATTA4c2aeac3634ce4f06d0dd547051484c39963943a3b1e951f22db6f8543e88cd71452AAC5";
const auth = `key=${key}&token=${token}`;

//create a board
export const createTask = async (req: Request, res: Response) => {

  try {
    console.log("---------------> req.body :", req.body)
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    const task = await Task.build(
      {
        id_workspace: req.body.id_workspace,
        name: req.body.name,
        description: req.body.description,
        id_responsable: req.body.id_responsable,
        paimentStatus: req.body.paimentStatus,
        relatedProject: req.body.relatedProject,
        dateEcheance: req.body.dateEcheance,
      })
      task.save();
    console.log("888888888888888888-----------> :",task)
    return res.status(200).json(task);

  } catch (err: any) {
    res.status(401).send(err);
  }
};



/******************************* integrate into trello  ***********************/
export const integrateInTrello = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    console.log("777777777777777777+------------> req.body", req.body)
    if(!task.idTrelloCard)
    {
      console.log("eeeeeetitititititititititi 777 222")
      const response = await axios.post(
        `${configData.baseURL}/cards?idList=${req.body.list}&${configData.auth}`,
        {
          name: task.name,
          desc: task.description,
          idList: req.body.list,
        }
      );
      console.log(response.data)
      const resultedTask = await task.updateOne(
        {
          idTrelloCard: response.data.id,
          //idCardWebhhok: cardWebhook.data.id,
          CardTrelloUrl: response.data.shortUrl,
        },
        { new: true }
      );
      res.status(200).send(resultedTask);
    }
  }else
  {
    res.status(200).json({error:"Task already integrated in trello"});
  }
};



/************************************** Add checklist *********************************/
export const AddCheckList = async (req: Request, res: Response)=> 
{
  console.log("----------------------------------20220202023-> req.body :", req.body )
  const  checklits = await CheckList.find({name:req.body.name,id_Task:req.params.id })
  console.log("finded checklist :", checklits)
  
  if(checklits.length!=0)
  {
    console.log("33333333333333333333333333333333")
    throw new BadRequestError("checklist name already exist")
  }
  const checkList = await CheckList.build({
    id_Task: req.params.id,
    name: req.body.name,
  }).save();

  console.log("11111111111111111checkList :", checkList);
 req.body.items.forEach(async (item: any)=>{
const checklistItem= await UnderTask.build({
  id_Checklist : checkList.id,
  description:item.description,
  collaborator: item.collaborator
}).save();

console.log("eeeeeeeeeeeeeee :", checklistItem)
 const resultedchecklist = await checkList.updateOne(
  { $push: { items: checklistItem } },
  { new: true }
);
console.log("resultedchecklist :", resultedchecklist)

 })

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { checkLists: checkList.id } },
    { new: true }
  );
  return res.status(200).json(checkList);
}


/********************************AddUnderTask**********************/
export const AddUnderTask = async (req: Request, res: Response) => {
  try {
    const underTask = await UnderTask.build({
      id_Checklist: req.params.id,
      description: req.body.description,
      collaborator: req.body.collaborator
    }).save();
console.log("underTask :", underTask)
    const checkList = await CheckList.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { items: underTask.id} },
      { new: true }
    );
    res.status(200).send(underTask);
  } catch (err: any) {
    res.status(401).send(err.response.data);
  }
};



export const AddTaskWithFiles = async (req: Request, res: Response) => {
  try {

    const uploadedFiles = req.files  as Express.Multer.File[];
    const jsonData = JSON.parse(req.body.jsonPayload);
    
    console.log("uploadedFiles :",uploadedFiles)
    console.log("jsonData :",jsonData)
    let files ;
    if(uploadedFiles)
    {
   console.log( "typeof uploadedFiles : ", typeof uploadedFiles)
    files =  uploadedFiles.map((element)=>{
    return  {
      originalname: element.originalname,
      encoding: element.encoding,
      filename: element.filename,
      size:element.size,
      mimetype: element.mimetype
    }
   })


   console.log("files----------++++++++++++*********//////////////> ",files)
    }

    const task =await Task.build({
      id_workspace:jsonData.id_workspace,
      id_responsable:jsonData.id_responsable,
      name: jsonData.name,
      paimentStatus: jsonData.paimentStatus,
      description: jsonData.description,
      dateEcheance: jsonData.dateEcheance,
      relatedProject: jsonData.relatedProject,
      files:files
    }).save()
    
    console.log("-----------------> : task :",task)
    res.status(200).json(task);

  } catch (err: any) {
    res.status(401).send(err);
  }
};





/********************************synchronizeTaskWithTrelloCard**********************/
export const synchronizeTaskWithTrelloCard = () => {};