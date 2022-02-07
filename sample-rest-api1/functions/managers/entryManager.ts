import { EntryModel } from "../models/EntryModel";
import * as entryAccessor from "../accessors/entryAccessor";
import * as firebaseEngine from "../engines/firebaseEngine";

const createEntry = async (input: any) => {
  try {
    const entry = new EntryModel(input.title, input.text);
    const entryId = await entryAccessor.createEntry(entry);

    return entryId;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getAllEntries = async () => {
  try {
    const entryList: EntryModel[] = [];
    const querySnapshot = await entryAccessor.getAllEntries();
    querySnapshot.forEach((doc: any) => entryList.push(doc.data()));

    return entryList;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getEntry = async (input: any) => {
  try {
    const entryDoc = await entryAccessor.getEntry(input.id);

    // parse the entry documents
    const dataModel: any =
      firebaseEngine.convertDocumentSnapshotToData(entryDoc);

    const entry = new EntryModel(dataModel.title, dataModel.text, dataModel.id);

    return entry;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const updateEntry = async (input: any) => {
  try {
    const entry = new EntryModel(input.title, input.text, input.id);
    const updatedEntry = await entryAccessor.updateEntry(entry);

    return updatedEntry;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const deleteEntry = async (input: any) => {
  try {
    const updatedEntry = await entryAccessor.deleteEntry(input.id);

    return updatedEntry;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export { createEntry, updateEntry, getEntry, getAllEntries, deleteEntry };
