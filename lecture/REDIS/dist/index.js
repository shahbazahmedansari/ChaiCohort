"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
const cacheStore = {
    // Clear, LRU, Server Crash, New Set of Problems
    totalPageCount: 0,
};
const redis = new ioredis_1.default({ host: 'localhost', port: Number(6379) });
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = 'rate-limit';
        const value = yield redis.get(key);
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
});
app.get('/', (req, res) => {
    return res.json({ message: 'success' });
});
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/books');
    console.log(response.data);
    return res.json(response.data);
}));
app.get('/books/total', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const cachedValue = yield redis.get('totalPageValue');
    // Check Cache
    if (cachedValue) {
        console.log(`Cache Hit`);
        return res.json({ totalPageCount: Number(cachedValue) });
    }
    const response = yield axios_1.default.get('https://api.freeapi.app/api/v1/public/books');
    const totalPageCount = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.reduce((acc, curr) => { var _a; return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : curr.volumeInfo.pageCount + acc; }, 0);
    yield redis.set('totalPageValue', totalPageCount);
    // Set the cache
    // cacheStore.totalPageCount = Number(totalPageCount);
    console.log(`Cache Miss`);
    console.log(totalPageCount);
    return res.json({ totalPageCount });
}));
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
