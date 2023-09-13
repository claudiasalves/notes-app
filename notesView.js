
class notesView {
    constructor(model) {
        this.model = model;
        this.mainContainerEl = document.querySelector('#main-container');

        this.inputEl = document.querySelector('#note-input');

        this.buttonEl = document.querySelector('#add-note-button');
        this.buttonEl.addEventListener('click', () => {
            const newNote = this.inputEl.value;
            this.addNewNote(newNote);
        });
    }

    addNewNote(newNote) {
        this.model.addNotes(newNote);
        this.displayNotes();
    }

    displayNotes() {
        
        const notesToRemove = document.querySelectorAll('.note');
        notesToRemove.forEach(note => {
            note.remove();
        });
        
        const notes = this.model.getNotes();
        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.textContent = note;
            noteEl.className = 'note';
            this.mainContainerEl.append(noteEl);
        });

        this.inputEl.value = '';
    }
}

module.exports = notesView;