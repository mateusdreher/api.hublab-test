db.createUser({
  user: 'hublab',
  pwd: 'Passw0rd',
  roles: [
    {
      role: 'readWrite',
      db: 'hublab_chat',
    },
  ],
});
