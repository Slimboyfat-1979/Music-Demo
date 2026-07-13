import express from 'express';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//Connect to mongodb

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/KathWebsite');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection-error'));
db.once('open', function(){
    console.log("Connected to mongodb")
})

const currDirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}));

app.get('/updatesite', (req, res) => {
    console.log(currDirname)
    res.sendFile(currDirname + "/gigform.html");
})

const eventSchema = new mongoose.Schema({
    eventName: String,
    eventVenue: String,
    eventTime: String,
    eventDate: String,
    eventPrice: String,
    eventDescription: String
})

const Event = mongoose.model('Event', eventSchema);


app.get("/", (req, res) => {
    Event.find().then(events => {
        res.render("index.ejs", {events})
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error fetching events");
    })
})



app.post('/formsubmit', (req, res) => {
    const action = req.body.action;

    if(action === 'purge'){
        Event.deleteMany({}).then(() => {
            res.render("index.ejs", {events: []})
        })
    }else{
        const eventDetails = {
            eventName: req.body.eventName,
            eventVenue: req.body.eventVenue,
            eventTime: req.body.eventTime,
            eventDate: req.body.eventDate,
            eventPrice: req.body.eventPrice,
            eventDescription: req.body.eventDescription
        };
        const event = new Event(eventDetails);
        event.save()
        .then(() => {
            Event.find().then(events => {
                res.render('index.ejs', {events});
            })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving event');
        });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

