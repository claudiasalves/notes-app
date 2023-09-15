const notesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks();

describe('Client class', () => {
    it('calls fetch and loads data', (done) => {
        const client = new notesClient();
        fetch.mockResponseOnce(JSON.stringify("Test Note"));
        client.loadNotes((returnedDataFromApi) => {
            expect(returnedDataFromApi).toBe("Test Note");
            done();
            });
        });
});