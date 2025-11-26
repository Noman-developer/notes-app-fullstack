const Note = require('../models/note'); // was '../models/Note'

// Add note
const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ userId: req.user.id, title, content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// 📄 Get notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✏️ Update note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    note.title = req.body.title;
    note.content = req.body.content;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ❌ Delete note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Unauthorized' });

    await note.deleteOne(); // ✅ FIXED
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error("Delete Error:", err); // optional: helps you debug
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addNote, getNotes, updateNote, deleteNote };
