import Bull from 'bull';

import redisConfig from '../config/redis';
import RecoveryMail from '../app/jobs/RecoveryMail';

const jobs = [RecoveryMail];

// Object.values retorna apenas o valor de determinado objeto.
const queues = Object.values(jobs).map(job => ({
  bull: new Bull(job.key, { redis: redisConfig }),
  name: job.key as string,
  handle: job.handle
}));

export default {
  queues,

  add(name: string, data: object) {
    // metodo para adicionar um job na fila.

    const queue = this.queues.find((queue) => queue.name === name);

    return queue?.bull.add(data);
    /* 
      * queue?: eu estou verificando se tem algum job na variavel queue.
      * pode se que ele não encontre nenhum job com o nome que foi passado como parametro.
    */
  },

  process() {
    // processar cada job na fila
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log(`Job ${job} Failed:`, err);
      });
    })
  }
}