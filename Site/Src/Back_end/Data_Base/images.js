const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ //armazenamento em disco, define onde e como vai salvar
    destination: (req, file, cb) => { //define a pasta de destino, cb e callback (mto top)
        cb(null, path.join(__dirname, '../../Front_end/Publico/img/Products/')); //pasta onde as img são salvas
    },
    filename: (req, file, cb) => {
        const nome = file.originalname; //define o nome do arquivo
        cb(null, nome);
    }
});

const upload = multer({ storage });

module.exports = upload;