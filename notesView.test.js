/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const notesModel = require('./notesModel');
const notesView = require('./notesView');
const notesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks();

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

    it('adds and displays a note', () => {
        const model = new notesModel()
        const view = new notesView(model);

        const buttonEl = document.querySelector('#add-note-button');
        const inputEl = document.querySelector('#note-input');

        view.addNewNote("One note");

        expect(document.querySelectorAll('div.note').length).toEqual(1);
        expect(document.querySelectorAll('div.note')[0].textContent).toEqual("One note");
    });

    it('adds and does not displays repeated notes', () => {
        const model = new notesModel()
        const view = new notesView(model);

        model.addNotes('One note');
        model.addNotes('Two notes');

        view.displayNotes();
        view.displayNotes();

        expect(document.querySelectorAll('div.note').length).toEqual(2);
    });

    class MockNotesClient {
        loadNotes(callback) {
          const mockNotes = ['Note 1'];
          callback(mockNotes);
        }
      }
      it('should fetch and display notes from the API', () => {
        const mockModel = {
          getNotes: jest.fn(() => []),
          addNotes: jest.fn(),
          setNotes: jest.fn(),
        };
        const NotesView = new notesView(mockModel, new MockNotesClient());
        NotesView.displayNotesFromApi();
        expect(mockModel.setNotes).toHaveBeenCalledWith(['Note 1']);
      });

});
