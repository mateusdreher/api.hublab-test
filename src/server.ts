import { app } from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.API_PORT || 5000;

try {
    app.listen(PORT);
    
    console.log(`Server listening on port ${PORT}`);
}
catch(error) {
    console.error(error);
}