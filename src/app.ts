import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
import createServer from './utils/server'

const port = config.get<number>('PORT')

const app = createServer()

app.listen(port, async () => {
    await connect()
    logger.info(`Server running at http://localhost:${port} 🚀`)
})

