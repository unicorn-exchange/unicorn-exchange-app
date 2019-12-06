import Queue, {Queue as IQueue} from "bull";
import {IAppContext} from "../interfaces/IContext";
import {RedisOptions} from "ioredis";
import {onTestQueue} from "./on-test-queue";
import {Events} from "../../../unicorn-exchange-types/types/enums/events";

// docker run -it --rm -p 6379:6379 --name redis_test redis redis-server --requirepass "redis_test"
export function initJobs(ctx: IAppContext) {
  const redis = {
    port: ctx.env.REDIS_PORT,
    host: ctx.env.REDIS_HOST,
    username: ctx.env.REDIS_USERNAME,
    password: ctx.env.REDIS_PASSWORD,
    enableReadyCheck: true,
    maxRetriesPerRequest: 1,
    autoResubscribe: true,
    enableOfflineQueue: true,
    lazyConnect: true,
    retryStrategy: n => {
      return false;
    },
  } as RedisOptions;

  ctx.services.queues = {
    testQueue: new Queue("test", {redis}),
  };
  const {testQueue} = ctx.services.queues;

  testQueue.on(Events.Error, err => {
    ctx.logger.error(err);
  });

  return testQueue.process(job => onTestQueue(job, ctx)).catch(ctx.logger.error);
}

export function disconnectJobs(ctx?: IAppContext): Promise<any> {
  if (!ctx || !ctx.services.queues) {
    return Promise.resolve();
  }
  return Promise.each(Object.values(ctx.services.queues), (queue: IQueue) => {
    return queue.close();
  });
}
