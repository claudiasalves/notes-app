const notesModel = require('./notesModel');

describe("notesModel", () => {

    it('initially it returns an empty list of notes', () => {
        const model = new notesModel();
        expect(model.getNotes()).toEqual([]);
    });

    it('adds new items to the list', () => {

        const model = new notesModel();
        model.addNotes("Buy milk");
        model.addNotes("Go to the gym");
        expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
    });

    it('it clears the list', () => {

        const model = new notesModel();
        model.addNotes("Note 1");
        model.reset();
        expect(model.getNotes()).toEqual([]);
    });

});