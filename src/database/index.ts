import mongoose from 'mongoose';

export class Database {
    connect(connectionString: string) {
        console.log('Connecting database...')
        mongoose.connect(connectionString)
        .then((data) => {
            console.log('Connect database successfully')
        })
        .catch((error) => {
            console.error(error)
        })
    }
}