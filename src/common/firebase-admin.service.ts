import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
	constructor() {
		// const serviceAccount = require('../../asean-mrc-firebase-adminsdk-9j3cd-62f22aa838.json');
		admin.initializeApp({
			// credential: admin.credential.cert(serviceAccount),
			credential: admin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			}),
		});
	}

	async sendNotification(
		token: string,
		payload: admin.messaging.MessagingPayload,
	) {
		const message: admin.messaging.Message = {
			token: token,
			notification: payload.notification,
			data: payload.data,
		};

		return await admin.messaging().send(message);
	}

	async sendMulticastNotification(
		tokens: string[],
		payload: admin.messaging.MessagingPayload,
	) {
		const message: admin.messaging.MulticastMessage = {
			tokens: tokens,
			notification: payload.notification,
			data: payload.data,
		};

		const responses = await admin.messaging().sendEachForMulticast(message);

		responses.responses.forEach((response, idx) => {
			if (response.error) {
				console.error(
					`Failed to send notification to ${tokens[idx]}: ${JSON.stringify(response.error)}`,
				);
			} else {
				console.log(`Successfully sent notification to ${tokens[idx]}`);
			}
		});

		return responses;
	}
}
