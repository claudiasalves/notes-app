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
            const emojifiedData = await this.replaceEmoji(data);
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({content: emojifiedData})
            });
            const result = await response.json();
            // console.log("Success:", result);
        } catch (error) {
            return error;
            
        }
    }

    async replaceEmoji(data) {
        try {
            const response = await fetch("https://makers-emojify.herokuapp.com/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: data }),
            });
            const result = await response.json();
            return result.emojified_text;
        } catch (error) {
            console.error('Error in replaceEmoji:', error);
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