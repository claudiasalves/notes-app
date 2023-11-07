
class notesView {
    constructor(model, client) {
        this.model = model;
        this.client = client;

        this.mainContainerEl = document.querySelector('#main-container');

        this.inputEl = document.querySelector('#note-input');

        this.buttonEl = document.querySelector('#add-note-button');
        this.buttonEl.addEventListener('click', () => {
            const newNote = this.inputEl.value;
            this.client.createNote(newNote).then((error) => {
                    if(error) {
                    this.displayError()
                    } else {
                    this.addNewNote(newNote);
                    this.displayNotes()
                }
            });
    })
    }

    async addNewNote(newNote) {
        const emojifiedNote = await this.client.replaceEmoji(newNote);
        this.model.addNotes(emojifiedNote);
        this.displayNotes();
    }

    displayNotesFromApi() {
        this.client.loadNotes((notes) => {
            // this.client.createNote(notes);
            this.model.setNotes(notes);
            this.displayNotes();
        });
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

    displayError() {
        const errorNotes= document.createElement('div');
        errorNotes.textContent = "Oops, something went wrong!"
        this.mainContainerEl.append(errorNotes);
    }
}

module.exports = notesView;