import fs from 'fs';
import archiver from 'archiver';
import dotenv from 'dotenv';
import chalk from 'chalk';

import packages from './package.json' with { type: 'json' };

dotenv.config();

const ref = 'output';
const br = process.env.BROWSER;
const dist = `dist/${packages.version}`;
const zip_name = `${packages.name}-${packages.version}-${br}`;

if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

const output = fs.createWriteStream(`${dist}/${zip_name}.zip`);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', () => {
    console.log(
        chalk.greenBright(`\nWorkspace →`),
        chalk.cyanBright(`${zip_name}.zip`),
        chalk.yellow(`[ ${archive.pointer()} bytes ]\n`)
    );
});

archive.on('error', (err) => {
    console.error(chalk.redBright('Workspace → Error: '), err);
    process.exit(1);
});

archive.pipe(output);

if (!fs.existsSync(`${ref}/${br}/`)) {
    console.error(chalk.hex('#ffbb00ff')(`\nWorkspace → "${ref}/${br}/" doesn't exist\n`));
    process.exit(1);
}

archive.directory(`${ref}/${br}/`, false);

archive.finalize();
