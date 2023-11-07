const notesView = require('./notesView');

class notesClient {
    loadNotes(callback, errorCallback) {
        fetch('http://localhost:3000/notes')
            .then(response => response.json())
            .then(data => {
                callback(data)})
            .catch(error => {
                errorCallback(error)});
        };

    async createNote(data) {
        try {
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({content: data})
            });
        
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            return error;
            
        }
    }

    async deleteNotes() {
        try {
            await fetch("http://localhost:3000/notes", {
            method: "DELETE"
            });   
        } catch (error) {
            console.error('Error in deleteNotes:', error);
            return Promise.reject(error);
        }
    }   
}

module.exports = notesClient;