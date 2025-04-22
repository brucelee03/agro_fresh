import {readFile} from 'fs/promises';
import pool from './db.js';

try {
    const schema = await readFile(new URL('./schema.sql', import.meta.url), {encoding: 'utf-8'  });
    await pool.query(schema);
    console.log('Schema applied successfully');
    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}