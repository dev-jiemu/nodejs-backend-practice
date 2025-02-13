import {Injectable, Logger} from '@nestjs/common';
import {Cron, Interval, SchedulerRegistry, Timeout} from "@nestjs/schedule";
import {CronJob} from "cron";

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name)

    constructor(private schedulerRegistry: SchedulerRegistry) {
        this.addCronJob()
    }

    private addCronJob = () => {
        const name = 'cronSample'

        const job = new CronJob('* * * * * *', () => {
            this.logger.warn(`run! ${name}`)
        })

        this.schedulerRegistry.addCronJob(name, job)
        this.logger.warn(`job ${name} added!`)
    }

    // 크론방식
    // ex) 45 * * * * * 매분 45초에
    @Cron('* * * * * *', {name: 'cronTask'})
    handleCron() {
        this.logger.log('Task Called')
    }

    // 인터벌
    @Interval('intervalTask', 3000)
    handleInterval() {
        this.logger.log('Task Called by interval')
    }

    // 일회성 배치
    @Timeout('timeoutTask', 5000)
    handleTimeout() {
        this.logger.log('Task Called by timeout')
    }
}
