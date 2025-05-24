const BASE_URL = 'http://localhost:5000/api/auth';
const NOTES_URL = 'http://localhost:5000/api/notes';
const token = localStorage.getItem('token');

// 🔐 LOGIN FORM
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'notes.html';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  });
}

// 📝 REGISTER FORM
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful, now login!');
        registerForm.reset();
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  });
}

// 🚫 Redirect to login if not logged in
if (window.location.pathname.includes('notes.html') && !token) {
  window.location.href = 'index.html';
}

// 📄 Load Notes
async function loadNotes() {
  try {
    const res = await fetch(NOTES_URL, {
      headers: { Authorization: token }
    });

    const notes = await res.json();
    const container = document.getElementById('notesContainer');
    if (!container) return;

    container.innerHTML = '';

    notes.forEach(note => {
      container.innerHTML += `
        <div class="card mb-2">
          <div class="card-body">
            <h5>${note.title}</h5>
            <p>${note.content}</p>
            <button onclick="deleteNote('${note._id}')" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert('Failed to load notes');
  }
}

// ➕ Add Note
const addNoteForm = document.getElementById('addNoteForm');
if (addNoteForm) {
  addNoteForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    try {
      const res = await fetch(`${NOTES_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ title, content })
      });

      if (res.ok) {
        addNoteForm.reset();
        loadNotes();
      } else {
        alert('Failed to add note');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  });
}

// ❌ Delete Note
async function deleteNote(id) {
  if (!confirm('Are you sure you want to delete this note?')) return;

  try {
    const res = await fetch(`${NOTES_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    });

    if (res.ok) {
      loadNotes();
    } else {
      alert('Failed to delete note');
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
}

// 🔁 Load notes on page load
if (window.location.pathname.includes('notes.html')) {
  loadNotes();
}

// 🚪 Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}
