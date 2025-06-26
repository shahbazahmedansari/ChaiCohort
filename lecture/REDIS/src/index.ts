import express from 'express';
import axios from 'axios';
import Redis from 'ioredis';

const app = express();

const PORT = process.env.PORT ?? 8000;

interface CachedStoreType {
	totalPageCount: number;
}

const cacheStore: CachedStoreType = {
	// Clear, LRU, Server Crash, New Set of Problems
	totalPageCount: 0,
};

const redis = new Redis({ host: 'localhost', port: Number(6379) });

app.use(async function (req: any, res: any, next: any) {
	const key = 'rate-limit';

	const value = await redis.get(key);

	if (value === null) {
		redis.set(key, 0);
		redis.expire(key, 60);
	}

	if (value && Number(value) > 10) {
		return res.status(429).json({ message: 'Too many requests' });
	}

	redis.incr(key);
	next();
});

app.get('/', (req: any, res: any) => {
	return res.json({ message: 'success' });
});

app.get('/books', async (req: any, res: any) => {
	const response = await axios.get(
		'https://api.freeapi.app/api/v1/public/books',
	);
	console.log(response.data);
	return res.json(response.data);
});

app.get('/books/total', async (req: any, res: any) => {
	const cachedValue = await redis.get('totalPageValue');
	// Check Cache
	if (cachedValue) {
		console.log(`Cache Hit`);
		return res.json({ totalPageCount: Number(cachedValue) });
	}
	const response = await axios.get(
		'https://api.freeapi.app/api/v1/public/books',
	);

	const totalPageCount = response.data?.data?.data?.reduce(
		(acc: number, curr: { volumeInfo?: { pageCount?: number } }) =>
			!curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc,
		0,
	);

	await redis.set('totalPageValue', totalPageCount);

	// Set the cache
	// cacheStore.totalPageCount = Number(totalPageCount);
	console.log(`Cache Miss`);
	console.log(totalPageCount);
	return res.json({ totalPageCount });
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
