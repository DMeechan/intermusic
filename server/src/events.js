require("./database");
const { Project, Track } = require("./schemas");

class Event {
    constructor() {

    }

    async getProjects() {
        try {
            return await Project.find();
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async createProject(name) {
        try {
            await Project.create({
                name
            });
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProject(id) {
        try {
            await Project.deleteOne({ id });
        } catch (error) {
            console.error(error);
        }
    }

    async addTrack(trackData, projectId) {
        try {
            const track = await this.createTrack(trackData);
            await Project.updateOne({
                _id: projectId
            },
                {
                    $push: {
                        tracks: track
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }

    async createTrack(data) {
        if (!data.name || !data.url || !data.length) {
            console.error('createTrack | Whoop, found not find name, url, or length data');
            return;
        }
        try {
            return await Track.create(data);
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTrack(id) {
        try {
            await Track.deleteOne({ id });
        } catch (error) {
            console.error(error);
        }
    }

    async deleteAll() {
        try {
            await Track.collection.drop();
            await Project.collection.drop();
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = Event;