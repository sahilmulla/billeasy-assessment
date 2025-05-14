const { Worker, Queue } = require('bullmq');
const fs = require('fs/promises');
const IORedis = require('ioredis');
const sha256 = require('crypto-js/SHA256');
const { File } = require('../models');

const connection = new IORedis({ maxRetriesPerRequest: null });

const queue = new Queue('computeChecksum', { connection });

exports.addFile = (fileId) => {
	console.log(`queueing ${fileId}`);
	queue.add('computeChecksum', { fileId });
};

const worker = new Worker(
	'computeChecksum',
	async (job) => {
		console.log('worker');
		if (job.name === 'computeChecksum') {
			const { fileId } = job.data ?? {};
			const file = await File.findByPk(fileId);

			if (!file) throw new Error(`File with id ${fileId} not found`);

			try {
				await file.update({ status: 'processing' });

				await new Promise((resolve) => setTimeout(resolve, 5000));
				const fileBuffer = await fs.readFile(file.storagePath);

				const checksum = sha256(fileBuffer).toString();

				await file.update({
					extractedData: checksum,
					status: 'processed',
				});

				console.log(`File ${fileId} processed`);
			} catch (err) {
				console.error(`Error processing file ${fileId}:`, err.message);
				await file.update({ status: 'failed' });
				throw err;
			}
		}
	},
	{ connection }
);

worker.on('completed', (job) => {
	console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
	console.error(`Job ${job.id} failed: ${err.message}`);
});
