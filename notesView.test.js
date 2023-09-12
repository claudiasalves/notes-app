/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const notesModel = require('./notesModel');
const notesView = require('./notesView');

describe('Notes view', () => {
    beforeEach(() => {
        document.body.innerHTML = fs.readFileSync('./index.html');
    });

    it('displays two notes', () => {
        const model = new notesModel()
        const view = new notesView(model);
        model.addNotes('One note');
        model.addNotes('Two notes');

        view.displayNotes();

        expect(document.querySelectorAll('div.note').length).toEqual(2);
    });

});
