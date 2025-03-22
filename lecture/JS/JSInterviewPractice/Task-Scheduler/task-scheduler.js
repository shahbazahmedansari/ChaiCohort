class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = Number(concurrency);
        this.runningTasks = 0;
        this.__waitingQueue = [];
    }

    getNextTask() {
        if (this.runningTasks < this.concurrency && this.__waitingQueue.length > 0) {
            const nextTask = this.__waitingQueue.shift();
            nextTask();
        }
    }

    addTask(task) {
        return new Promise((resolve, reject) => {
            async function __taskRunner() {
                this.runningTasks += 1;
                try {
                    const result = await task();
                    console.log(`Result`, result);
                    resolve(result);
                } catch (error) {
                    console.log(`Task failed`, error);
                    reject(error);
                } finally {
                    this.runningTasks -= 1;
                    // See if any task is in queue
                    // If so, run that task
                    this.getNextTask();
                }
            }

            if (this.runningTasks < this.concurrency) {
                __taskRunner.call(this);
            } else {
                this.__waitingQueue.push(__taskRunner.bind(this));
            }
        });
    }
}

// Example usage: Only two tasks should run in parallel
const scheduler = new TaskScheduler(10);

scheduler.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 1'), 1000))
);
scheduler.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 2'), 500))
);
scheduler.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 3'), 300))
);
scheduler.addTask(
    () => new Promise((res) => setTimeout(() => res('Task 4'), 400))
);

// Another example:

function saveToDB(message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Message ${message} saved to DB!`);
            resolve();
        }, 2 * 1000);
    });

}

function chat() {
    const messages = Array(100).fill(null);

    messages.forEach((_, index) => {
        const message = `Message:${index}`;
        scheduler.addTask(() => saveToDB(message));
    });
}