import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MySQLJP',
  connector: 'mysql',
  // url: 'mysql://root:password@db:3306/javepuntos_db',
  url: 'mysql://root:password@localhost:3307/javepuntos_db',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MySqljpDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'MySQLJP';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MySQLJP', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
