import {Controller, Post} from '@nestjs/common';
import {SchedulerRegistry} from "@nestjs/schedule";

@Controller('batches')
export class BatchController {
    constructor(private scheduler: SchedulerRegistry) {}

    @Post('/start-sample')
    start() {
        const job = this.scheduler.getCronJob('cronSample')
        job.start()
        console.log('job start', job.lastDate())
    }

    @Post('/stop-sample')
    stop() {
        const job = this.scheduler.getCronJob('cronSample')
        job.stop()
        console.log('job stop', job.lastDate())
    }
}
