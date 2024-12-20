"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const bull_1 = require("@nestjs/bull");
const _config_1 = require("./config");
const nestjs_ioredis_1 = require("@svtslv/nestjs-ioredis");
const bull_2 = require("./config/redis/bull");
const Services = require("./service");
const Queues = require("./queue");
const Schedules = require("./schedule");
const _environments_1 = require("./environments");
const test_controller_1 = require("./controller/test.controller");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const _entity_1 = require("./entity");
const tgbotQueueModule = bull_1.BullModule.registerQueueAsync({
    name: 'tgbot',
    useFactory: bull_2.BullOptionsFactory,
});
const tweetQueueModule = bull_1.BullModule.registerQueueAsync({
    name: 'tweet',
    useFactory: bull_2.BullOptionsFactory,
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_ioredis_1.RedisModule.forRootAsync({
                useClass: _config_1.RedisService,
            }),
            mongoose_1.MongooseModule.forRoot(_environments_1.MONGO_URI),
            mongoose_1.MongooseModule.forFeature([
                { name: _entity_1.GmgnToken.name, schema: _entity_1.GmgnTokenSchema },
            ]),
            tgbotQueueModule,
            tweetQueueModule,
        ],
        controllers: [app_controller_1.AppController, test_controller_1.TestController],
        providers: [
            {
                provide: 'REDIS_CLIENT',
                useFactory: () => {
                    return new ioredis_1.Redis({
                        host: _environments_1.REDIS_HOST,
                        port: _environments_1.REDIS_PORT,
                        password: _environments_1.REDIS_PASSWORD,
                    });
                },
            },
            app_service_1.AppService,
            ...Object.values(Services),
            ...Object.values(Queues),
            ...Object.values(Schedules),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map