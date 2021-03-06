/**
 *  Copyright 2019 The Adaptive Web. All Rights Reserved.
 * 
 *  Licensed under the Mozilla Public License 2.0 (the "License"). 
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *  
 *      https://www.mozilla.org/en-US/MPL/2.0/
 *  
 *  or in the "license" file accompanying this file. This file is distributed 
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 *  express or implied. See the License for the specific language governing 
 *  permissions and limitations under the License.
 */
export default class PluginCommunicator {

	constructor(adapterUpdateCallback, devAdapterCallback) {
		this.messageIterator = 0;
		this.resolveBacklog = {};
		this.loadBacklog = [];
		this.pluginLoaded = false;
		this.timeout = 1000;
		this.devAdapterCallback = devAdapterCallback;
		this.adapterUpdateCallback = adapterUpdateCallback;
		// register
		window.addEventListener('message', this.handleMessage.bind(this));

		window.setTimeout(() => {
			if (!this.pluginLoaded) window.location.href = 'https://adaptiveweb.io/';
		}, 1000);
	}

	requestAdapters() {
		this.sendMessage('requestAdapters')
			.then(response => Object.keys(response).map(k => response[k]))
			.then(adapters => {
				this.adapterUpdateCallback(adapters);
				return adapters;
			});
	}

	installAdapter(adapter, replace = false) {
		this.sendMessage('installAdapter', { adapter, replace }, false);
		this.requestAdapters();
	}

	removeAdapter(adapterId) {
		this.sendMessage('removeAdapter', { adapterId }, false);
		this.requestAdapters();
	}

	updateAdapterPreferences(adapterId, preferences) {
		this.sendMessage('updatePreferences', { adapterId, preferences }, false);
	}

	getAdapterPreferences(adapterId) {
		return this.sendMessage('getAdapterPreferences', { adapterId });
	}

	setGlobalOptions(data) {
		this.sendMessage('setGlobalOptions', data, false);
	}

	getGlobalOptions() {
		return this.sendMessage('getGlobalOptions');
	}

	sendMessage(message, data, expectReply = true) {
		return new Promise((resolve, reject) => {
			let messageId = ++this.messageIterator;
			if (!this.pluginLoaded) {
				this.loadBacklog.push({ messageId, type: message, data });
			} else {
				window.postMessage({ messageId, type: message, data, outbound: true }, '*');
			}

			if (expectReply) {
				this.resolveBacklog[messageId] = { resolve, reject };

				setTimeout(() => { 
					if (this.resolveBacklog[messageId] !== undefined) {
						this.resolveBacklog[messageId] = undefined;
						reject('Message sending timeout'); 
					}
				}, this.timeout);
			}
		});
	}

	handleMessage(event) {
		// Is this message initiating the plugin?
		if (event.data.message === 'initAdaptiveWebPlugin') {
			this.pluginLoaded = true;
			this.loadBacklog.forEach(message => {
				let { messageId, type, data } = message;
				window.postMessage({ messageId, type, data, outbound: true }, '*');
			});
			return;
		}
		if (event.data.message === 'incomingDeveloperAdapters') {
			this.devAdapterCallback(event.data.data);
			return;
		}

		if (!this.pluginLoaded) return;
		if (event.data.outbound) return;

		let { messageId, data, isError } = event.data;
		let backlog = this.resolveBacklog[messageId];
		if (backlog !== undefined) {
			let { resolve, reject } = backlog;
			this.resolveBacklog[messageId] = undefined;

			if (isError) reject(data);
			else         resolve(data);
		}
	}

}