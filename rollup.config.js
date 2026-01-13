import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import fs from 'fs';
import chalk from 'chalk';

import manifest from './manifest.js';

import dotenv from 'dotenv';
dotenv.config();

import packages from './package.json' with { type: 'json' };
import json from '@rollup/plugin-json';


/**
 * @param {string} root 
 * @returns {function}
 */
function makePath(root) {
    return function (path = '') {
        return root + (path.trim() ? '/' + path : path);
    }
}

const public_path = 'public';
const publicPath = makePath(public_path);

const output = 'output/' + process.env.BROWSER;
const outPut = makePath(output);

const dev_output = 'tests';
const devOutput = makePath(dev_output);

const success = chalk.hex('#44ff98ff');
const nothing = chalk.hex('#ffbb00ff');
const processing = chalk.hex('#00fff2ff');
const erroring = chalk.hex('#ff4848ff');

const tsconfig_path = './tsconfig.json';

const terser_options = {
    ecma: 2020,
    keep_fnames: true,
    keep_classnames: true,
    mangle: false,
    format: {
        beautify: true,
    }
}

const content_output_dir = outPut('src');
const content_output = {
    dir: content_output_dir,
    entryFileNames: '[name].js',
}
const content_plugin = [
    typescript({
        tsconfig: tsconfig_path,
        outDir: content_output_dir
    }),
    terser(terser_options),
    resolve({
        browser: true,
        extensions: ['.js', '.ts']
    }),
    commonjs(),
    json(),
]
const content_scripts = {
    input: 'src/main/main',
    output: {
        ...content_output,
        format: 'es'
    },
    plugins: content_plugin
}
const content_repeater = {
    input: 'src/repeater/repeater',
    output: {
        ...content_output,
        format: 'iife'
    },
    plugins: content_plugin
}
const content_generator = {
    input: 'src/generator/generator',
    output: {
        ...content_output,
        format: 'iife'
    },
    plugins: content_plugin
}
const content_injector = {
    input: 'src/injector/injector',
    output: {
        ...content_output,
        format: 'iife'
    },
    plugins: content_plugin
}

const contents = [content_scripts, content_repeater, content_generator, content_injector];

const background_service_output = outPut('service');
const background_service = {
    input: 'service/background.ts',
    output: {
        dir: background_service_output,
        entryFileNames: '[name].js',
        format: 'es'
    },
    plugins: [
        typescript({
            tsconfig: tsconfig_path,
            outDir: background_service_output
        }),
        terser(terser_options),
        json(),
    ]
}

const options_page_filename = 'options.html';
const options_page_output = outPut('page');
const options_page_output_file = options_page_output + '/main.js';

const options_page_html = {
    title: packages.name,
    fileName: options_page_filename,
    template: ({ title }) => fs.readFileSync('./example/index.html', 'utf-8')?.replace('{title}', title),
}

const options_page_plugin = [
    resolve({
        browser: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    terser({
        ecma: 2020
    }),
    babel({
        babelHelpers: 'bundled',
        presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
        ],
        plugins: [
            ['babel-plugin-react-compiler', { target: '19' }]
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    html(options_page_html),
    postcss(),
    json(),
]

if (parseInt(process.env.DEV) < 1) {
    options_page_plugin.push(
        typescript({
            tsconfig: tsconfig_path,
            outDir: options_page_output
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
    );
}

const options_page = {
    input: 'page/index',
    output: {
        file: options_page_output_file,
        format: 'iife'
    },
    plugins: options_page_plugin
}

let result = [...contents, background_service, options_page];

if (parseInt(process.env.DEV) === 2) {
    clean();
    result = [];
}
else if (parseInt(process.env.DEV)) {
    options_page_html.fileName = 'index.html';
    const base = devOutput();
    fs.rm(base, { recursive: true, force: true }, err => {
        if (err) {
            console.error('Error deleting directory:', err);
        } else {
            console.log(success('Directory deleted successfully'));
        }
    });
    Object.assign(options_page.output, {
        file: base + '/main.js',
        sourcemap: true
    });
    options_page.plugins = [
        ...options_page.plugins,
        typescript({
            tsconfig: tsconfig_path,
            outDir: base
        }),
        html(options_page_html),
        serve(base),
        livereload(base),
        replace({
            'process.env.NODE_ENV': JSON.stringify('dev'),
            preventAssignment: true
        }),
    ]

    result = options_page;
}
else {
    clean();

    if (fs.existsSync(public_path)) {
        console.log(success(`\nWorkspace → "${public_path}" directory exists`));

        const output_dir = fs.readdirSync(public_path) ?? [];

        output_dir.forEach(r => {
            const path = publicPath(r);
            try {
                fs.cpSync(path, outPut(r), { recursive: true });
                console.log(processing(`Copy "${path}" → "${output}"`));
            } catch (error) {
                console.error(erroring('Error: '), error);
            }
        });
    }
    else {
        console.log(nothing(`\nWorkspace → "${public_path}" directory doesn't exists`));
    }

    if (fs.existsSync('manifest.js')) {
        console.log(success(`\nWorkspace → "manifest.js" file exists`));

        try {
            fs.writeFileSync(outPut('manifest.json'), JSON.stringify(manifest, null, 2));
            console.log(processing(`Make "manifest.js"`));
        } catch (error) {
            console.error(erroring('Error: '), error);
        }
    }
    else {
        console.error(erroring(`\nWorkspace → "manifest.js" file doesn't exists`));
        console.error(erroring(`\n→ process.exit(1);`));
        process.exit(1);
    }
}

function clean() {
    if (fs.existsSync(output)) {
        console.log(success(`\nWorkspace → "${output}" directory exists`));

        const output_dir = fs.readdirSync(output) ?? [];

        output_dir.forEach(r => {
            const path = outPut(r);
            try {
                fs.rmSync(path, { recursive: true, force: true });
                console.log(chalk.hex('#ff008cff')(`Remove "${path}"`));
            } catch (error) {
                console.error(erroring('Error: '), error);
            }
        });
    }
    else {
        console.log(nothing(`\nWorkspace → "${output}" directory doesn't exists`));
    }
}

export default result;
