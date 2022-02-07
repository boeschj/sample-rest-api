import { Request, Response } from "express";
import * as entryManager from "../managers/entryManager";

const createEntry = async (req: Request, res: Response) => {
  try {
    //parse req body into input and pass to entry manager
    const input: any = req.body.input;
    const entryId = await entryManager.createEntry(input);

    //TODO: We will be wanting some form of middleware (like cors) to handle input validation and error handling at some point
    //communicate the results of this operation
    entryId
      ? res.status(200).send({
          status: "success",
          message: "entry added successfully",
          id: entryId,
        })
      : res.status(500).send({
          status: "error",
          message: "No entry id returned",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllEntries = async (res: Response) => {
  try {
    const allEntries = await entryManager.getAllEntries();

    return res.status(200).json(allEntries);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getEntry = async (req: Request, res: Response) => {
  try {
    //parse req body into input and pass to entry manager
    const input: any = req.body.input;
    const entry = await entryManager.getEntry(input);

    return entry
      ? res.status(200).json(entry)
      : res.status(500).json({ message: "Entry not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateEntry = async (req: Request, res: Response) => {
  try {
    //parse req body into input and pass to entry manager
    const input: any = req.body.input;
    const updatedEntry = await entryManager.updateEntry(input);

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteEntry = async (req: Request, res: Response) => {
  try {
    //parse req body into input and pass to entry manager
    const input: any = req.body;
    const updatedEntry = await entryManager.deleteEntry(input);

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { createEntry, getAllEntries, getEntry, updateEntry, deleteEntry };
