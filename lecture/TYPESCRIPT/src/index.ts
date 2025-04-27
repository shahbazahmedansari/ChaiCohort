import http from 'http';
import { env } from './env';
import { logger } from './logger';
import { createApp } from './app';

async function main() {
	try {
		const PORT: number = +(env.PORT ?? 8000);
		const server = http.createServer(createApp());
		server.listen(PORT, () => {
			logger.info(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		logger.error(`Error starting server`, error);
	}
}

main();
