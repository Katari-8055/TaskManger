import Note from "../models/task.js"; // Make sure this model is correct (should probably be note.js not task.js?)


//Add Notes-----------------------------------------------------

export const addNotes = async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId, // Assuming this field exists in the schema
    });

    await note.save(); // ✅ Save the note instance

    res.status(201).json({
      error: false,
      message: "Note added successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server error",
      details: error.message,
    });
  }
};

//Edit Notes------------------------------------------------------

export const editNotes = async (req,res) => {
 // Extracting noteId from the request URL parameters
  const { noteId } = req.params;
  const userId = req.user.userId;

  // Extracting fields from the request body
  const { title, content, tags, isPinned } = req.body;

  // Validate input: At least one field must be provided
  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes provided"
    });
  }

  try {

    const note = await Note.findOne({_id: noteId, userId});

    if(!note){
        return res.status(404).json({error: true, message: "Note Not Found"})
    }

    if(title) note.title = title;
    if(content) note.content = content;
    if(tags) note.tags = tags;
    if(isPinned) note.isPinned = isPinned;
    

    await note.save();

    return res.json({
        error: false,
        note,
        message: "Note Update SuccesFully",

    });



  } catch (error) {
    return res.status(500).json({
        error: true,
        message: "Internal Server Error"
    })
  }

} 


//Get Notes-----------------------------------------------------

export const getnotes = async (req, res) => {
  const userId = req.user.userId;

  try{
    const notes = await Note.find({userId: userId}).sort({isPinned: -1})

    return res.json({
      error: false,
      notes,
      message: "All Notes Retrived SuccesFullly",
    });
  }catch(error){
    return res.status(500).json({
      error: true,
      message: "Interval Server Error"
    });
  }
}

//Delete Note---------------------------------------------------

export const deletenotes = async (req, res) => {
  const userId = req.user.userId;
  const { noteId } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found or unauthorized" });
    }

    res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

//isPinned---------------------------------------------

export const pinnednotes = async (req, res) => {
  const userId = req.user.userId;
  const { noteId } = req.params;
  const { isPinned } = req.body;

  // ✅ Check that isPinned is provided and is a boolean
  if (typeof isPinned !== "boolean") {
    return res.status(400).json({
      error: true,
      message: "Invalid or missing 'isPinned' value",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: `Note ${isPinned ? "pinned" : "unpinned"} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message, // optional for debugging
    });
  }
};


// Search Api

export const serchnotes = async (req, res) => {
  const userId = req.user.userId;
  const {query} = req.query;

  if(!query){
    return res.status(400)
    .json({error: true, message: "Search Query is Required"})
  }

  try {
    const matchingNotes = await Note.find({
      userId,
      $or : [
        {title: {$regex: new RegExp(query, "i")}},
        {content: {$regex: new RegExp(query, "i")}},
      ],
    })


    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Mote Matching The Search Query Retreeved Succesfully"
    })

  } catch (error) {
    return res.status(500).json({
      error: false,
      message: "Interval server Issue"
    })
  }
  
}