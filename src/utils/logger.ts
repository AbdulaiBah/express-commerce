import pino from 'pino'
import dayjs from 'dayjs'

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            messageFormat: '{msg}',
        },
    },
    timestamp: () =>  `, "time:"${dayjs().format()}`
})

export default log