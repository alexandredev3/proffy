import factory from 'factory-girl';

factory.define('User', null, {
  name: 'Alexandre2 Costa2',
  email: 'alexandre@gmail.com',
  password_hash: '12345678'
});

export default factory;