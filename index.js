const AES = require("crypto-js/aes");
const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req,res) => {
    var url = new URL(`http://websi.te${req.url}`);
    if(url.pathname == '/api/retrieve') {
        var not_allowed_characters = [
            '/',':',';','@','%','?','=','&'
        ];
        try {
            for(var nac = 0; nac < not_allowed_characters.length; nac ++) {
                if(url.searchParams.get('id').includes(nac)) {
                    throw new Error('invalid character')
                }
            }
            var encrypted_data = fs.readFileSync('./students/'+url.searchParams.get('id')+'.json');
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write(encrypted_data);
            res.end();
        } catch (error) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.write('500 Error Occurred');
            res.end();
        }
    } else {
        try {
            fs.statSync('./public/'+url.pathname);
        } catch (error) {
            res.writeHead(400, {'content-type': 'text/html'});
            res.write(fs.readFileSync('./fourofour.html'));
            return res.end()
        }
        res.writeHead(400, {'content-type': getMimeType(url.pathname)});
        res.write(fs.readFileSync('./public/'+url.pathname));
        return res.end()
    }
});

function getMimeType() {}