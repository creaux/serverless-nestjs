import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;
  const HELLO_SERVICE_TOKEN = 'HELLO_SERVICE';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: HELLO_SERVICE_TOKEN,
            transport: Transport.REDIS,
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.REDIS,
    });

    await app.startAllMicroservicesAsync();
    await app.init();

    client = app.get(HELLO_SERVICE_TOKEN);
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it('test hello', (done) => {
    const response: Observable<string> = client.send({ cmd: 'hello' }, {});

    response.subscribe((sum) => {
      expect(sum).toBe('Hello World!');
      done();
    });
  });
});
