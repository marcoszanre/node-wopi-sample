const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

var rawBodyParser = require('raw-body-parser');
app.use(rawBodyParser());

//10.2.0.6/wopi/files/Governance.pdf
app.get('/wopi/files/:file_id', function (req, res) {
    const stats = fs.statSync(path.join(__dirname, '/files', `${req.params.file_id}`));
    const fileSizeInBytes = stats["size"];
    return res.send(
        {
            BaseFileName: `${req.params.file_id}`,
            OwnerId: 'contosouser',
            Size: fileSizeInBytes,
            UserId: 'contosouser',
            UserFriendlyName: "Contoso User",
            Version: "aaabbbcccdddeee",
            SupportsLocks: true,
            WebEditingDisabled: false,
            UserCanWrite: true,
            SupportsUpdate: true
        }
    );
});

//10.2.0.6/wopi/files/Governance.pdf/contents
app.get('/wopi/files/:file_id/contents', function (req, res) {
    const data = fs.readFileSync(path.join(__dirname, '/files', `${req.params.file_id}`));
    res.send(data);
});

//LOCK UNLOCK
app.post('/wopi/files/:file_id', function (req, res) {
    if (
        (req.header('X-WOPI-Override') == 'LOCK') ||
        (req.header('X-WOPI-Override') == 'UNLOCK') ||
        (req.header('X-WOPI-Override') == 'REFRESH_LOCK')) {
        console.log(req.header('X-WOPI-Override'));
        res.sendStatus(200);
    }
});

//PUT FILE
app.post('/wopi/files/:file_id/contents', function (req, res) {
    const filePath = path.join(__dirname, '/files', `${req.params.file_id}`);
    var wstream = fs.createWriteStream(filePath);
    wstream.write(req.rawBody);
    console.log('success');
    res.sendStatus(200);
});

app.listen(process.env.PORT || 8080, () => {
    console.log('up and running');
});