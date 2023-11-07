// console.log('the notes app is running')

const notesModel = require('./notesModel');
const notesView = require('./notesView');
const notesClient = require('./notesClient');


const client = new notesClient();
const model = new notesModel();
const view = new notesView(model, client);



client.loadNotes((notes) => {
    model.setNotes(notes);
    view.displayNotes();
}, () => {
    view.displayError();
});


