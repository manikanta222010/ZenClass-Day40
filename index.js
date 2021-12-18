const fs = require("fs")

//function to get a file with content of the current timestamp
const timestamp = () => {
    var d = new Date();
    var content = d.toString()

    var date = d.getDate()
    var month = d.getMonth() + 1
    var time = (d.getHours() + " " + d.getMinutes() + " " + d.getSeconds())

    fs.writeFile(`./${"(" + date + "-" + month + ")" + "-" + time}.txt`, content, err => {
        if (err) {
            console.log(err)
        }
        console.log("Completed writing!!")
    })
    return content
}

const express = require("express")
const app = express()

const PORT = 9000
app.get("/", (request, response) => {
    response.redirect("/timestamp")
})

app.get("/timestamp", (request, response) => {
    response.send(timestamp())
})

const allTextFiles = () => {
    const path = require('path');
    const fs = require('fs');
    //joining path of directory 
    const directoryPath = path.join(__dirname, "/");
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            if (file.substring(file.length - 3) == "txt") {
                console.log(file);
            }
        });
    });
}

app.get("/text-files", (request, response) => {
    response.send(allTextFiles()) // return all the txt files in the folder
})

app.listen(PORT, () => console.log("App started in ", PORT))