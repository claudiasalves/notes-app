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
        console.log('createNote called with data:', data);
        try {
            const emojifiedData = await this.replaceEmoji(data);
            console.log('Emojified data:', emojifiedData);
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({content: emojifiedData})
            });
        
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            return error;
            
        }
    }

    async replaceEmoji(data) {
        console.log('Received data in replaceEmoji:', data);
        try {
            const response = await fetch("https://makers-emojify.herokuapp.com/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: data }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const result = await response.json();
            console.log('Emojified result:', result);
            return result.emojified_text;
        } catch (error) {
            console.error('Error in replaceEmoji:', error);
            return error;
        }
    }
    
}

module.exports = notesClient;