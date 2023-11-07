class notesModel {
    constructor() {
        this.notes = [];
    }

    addNotes(note) {
        this.notes.push(note);
    }

    setNotes(notesApi){
        this.notes = notesApi;
    }

    getNotes() {
        return this.notes;
    }

    reset() {
        this.notes = [];
    }
}

module.exports = notesModel