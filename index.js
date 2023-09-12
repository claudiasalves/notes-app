console.log('the notes app is running')

const notesModel = require('./notesModel');
const notesView = require('./notesView');

const model = new notesModel();
model.addNotes("Walk the dog");
model.addNotes("Go for a walk");


const view = new notesView(model);
view.displayNotes();


console.log(model.getNotes());