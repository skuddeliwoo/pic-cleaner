const fs = require('fs');
const path = require('path');

const nefext = '.NEF'
const jpgext = '.JPG'

async function listPics() {
    const dir = await fs.promises.opendir(__dirname)

    let entry = await dir.read();
    let jpgs = [];
    let nefs = [];

    while (entry != null) {
        if (entry.name.includes(jpgext)) {
            jpgs.push(entry.name)
        } else if (entry.name.includes(nefext)) {
            nefs.push(entry);
        }
        entry = await dir.read();
    }

    nefs2keep = jpgs.map((el) => el.substring(0, el.indexOf(jpgext)) + nefext)

    console.log(nefs);
    console.log(nefs2keep);

    nefs.map((nef) => {
        if (!nefs2keep.includes(nef.name)) {
            fs.unlinkSync(path.join(__dirname, nef.name))
        }
    });
}

listPics();
