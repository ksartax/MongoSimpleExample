var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");

    createCollection(dbo);
    insertMany(dbo);
    insertOne(dbo);
    findAll(dbo);
    findAllSelectImie(dbo);
    findAllSortNameDesc(dbo);
    findAllSortNameAsc(dbo);
    deleteOneByImie(dbo, 'Adam');
    findAll(dbo);
    update(dbo);

    deleteManyAll(dbo);
    findAll(dbo);

    db.close();
});

function createCollection(dbo) {
    dbo.createCollection("wiadomosci", (err, res) => {
        if (err) throw err;
        console.log("Kolekcja utworzona");
    });
}

function insertOne(dbo) {
    var myobj = {
        imie: "One", nazwisko: "O", widomosc: "To moja pierwsza wiadomosc"
    };

    dbo.collection("wiadomosci").insertOne(myobj, (err, res) => {
        if (err) throw err;

        console.log("Kolekcja wstawiona");
    });
}

function insertMany(dbo) {
    var myobj = [
        {
            imie: "San", nazwisko: "A", widomosc: "To moja pierwsza wiadomosc"
        },
        {
            imie: "Adam", nazwisko: "V", widomosc: "To moja druga wiadomosc"
        },
        {
            imie: "Leon", nazwisko: "D", widomosc: "To moja trzecia wiadomosc"
        }
    ];
    dbo.collection("wiadomosci").insertMany(myobj, (err, res) => {
        if (err) throw err;

        console.log("Kolekcja wstawiona");
    });
}

function findAll(dbo) {
    dbo.collection("wiadomosci").find().toArray((err, result) => {
        if (err) throw err;

        console.log(result);
    });
}

function findAllSelectImie(dbo) {
   dbo.collection("wiadomosci").find({}, { imie: 1, nazwisko: 0, widomosc: 0 }).toArray((err, result) => {
        if (err) throw err;

        console.log("Kolekcja wstawiona");
    });
}

function findByFirstLetterSSelectImieQuery(dbo) {
   var query = { imie: /^S/, nazwisko: 0, widomosc: 0 };

    dbo.collection("wiadomosci").find(query).toArray((err, result) => {
        if (err) throw err;

        console.log("Kolekcja wstawiona");
    });
}

function findAllSortNameDesc(dbo) {
   dbo.collection("wiadomosci").find().sort({ name: -1 }).toArray((err, result) => {
        if (err) throw err;

        console.log(result);
    });
}

function findAllSortNameAsc(dbo) {
   dbo.collection("wiadomosci").find().sort({ name: 1 }).toArray((err, result) => {
        if (err) throw err;

        console.log(result);
    });
}

function deleteOneByImie(dbo, _imie) {
   dbo.collection("wiadomosci").deleteOne({ imie: _imie }, (err, obj) => {
        if (err) throw err;

        console.log("wykasowany rekord");
    });
}

function deleteManyAll(dbo) {
    dbo.collection("wiadomosci").deleteMany({ nazwisko: /^/ }, (err, obj) => {
        if (err) throw err;

        console.log("wykasowany rekord");
    });
}

function update(dbo) {
    var myquery = { imie: "Leon" };
    var newvalues = { $set: { nazwisko: "Update" } };

    dbo.collection("wiadomosci").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;

        console.log("rekord zedytowany");
    });
}