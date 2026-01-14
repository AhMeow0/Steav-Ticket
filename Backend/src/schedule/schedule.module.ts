import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { schedule, scheduleSchema } from "./schema/schedule.schema";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service"

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: schedule.name, schema: scheduleSchema}
        ]),
    ],
    controllers: [ScheduleController],
    providers: [ScheduleService]
})
export class ScheduleModule{}