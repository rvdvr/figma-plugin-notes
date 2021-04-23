import { dispatch, handleEvent } from './codeMessageHandler';
figma.showUI(__html__);


// send
figma.clientStorage.getAsync('tasks').then((res) => {
	dispatch('sendChangedStorage', res)
})

// from
handleEvent('changeStorage', (tasks) => {
	figma.clientStorage.setAsync('tasks', tasks);

	// send
	figma.clientStorage.getAsync('tasks').then((res) => {
		dispatch('sendChangedStorage', res)		
	})
});


// The following shows how messages from the UI code can be handled in the main code.
handleEvent('createNode', () => {
	const node = figma.createRectangle();
	node.name = node.id;

	// This shows how the main code can send messages to the UI code.
	dispatch('nodeCreated', node.id);
});
