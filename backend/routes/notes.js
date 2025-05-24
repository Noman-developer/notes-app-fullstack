const express = require('express');
const router = express.Router();
const { addNote, getNotes, updateNote, deleteNote } = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes below need the user to be logged in (middleware)
router.post('/add', authMiddleware, addNote);
router.get('/', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;

