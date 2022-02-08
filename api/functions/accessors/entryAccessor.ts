import { EntryModel } from "../models/EntryModel";
import { db } from "../src/config/firebase";

const createEntry = async (model: EntryModel) => {
  try {
    //create new entry
    const entry = db.collection("entries").doc();

    //set our model id
    model.id = entry.id;

    //add to firestore
    await entry.set(model.toJson());

    return model.id;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getAllEntries = async () => {
  try {
    // fetch all entries
    const querySnapshot = await db.collection("entries").get();

    return querySnapshot;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getEntry = async (id: string) => {
  // fetch the doc
  const doc = await db.collection("entries").doc(id).get();

  // if the doc exists, return
  if (doc.exists) {
    return doc;
  } else {
    throw new Error("Entry not found");
  }
};

const updateEntry = async (model: EntryModel) => {
  //if id exists, grab the corresponding doc from firestore
  if (model.id) {
    const doc = db.collection("entries").doc(model.id);

    //verify that this id links to a valid entry and then update
    if ((await doc.get()).exists) {
      await doc.update(model.toUpdateInput());
      return model.id;
    } else {
      throw new Error("Entry not found");
    }
  } else {
    throw new Error("No entry id provided");
  }
};

const deleteEntry = async (entryId: string) => {
  //grab the doc from the db
  const entryRef = db.collection("entries").doc(entryId);
  const entryDoc = await entryRef.get();

  //if the doc exists, delete it
  if (!entryDoc.exists) {
    throw new Error("Entry not found");
  } else {
    await entryRef.delete();

    return {
      entryId: entryId,
      message: "entry deleted successfully",
    };
  }
};

export { createEntry, updateEntry, getAllEntries, getEntry, deleteEntry };
