
// Use the fetch API to send a request for the audio file over the network (in this case, local)
// The file will eventually be received back from the server
// Fetch returns back to us is a Promis object that will give us a chance to react when that happens
/*
 * supply then with a callback function we want to run when the response comes in
 * in the call back arrayBuffer() method of the response
 *  - letting it know that we want to have the incoming data as a binary ArrayBuffer object
 * Next then waits until all data is recieved and then console logs that data
 * Then a catch to see if anything goes wrong in the whole process
 */
//fetch('yup.mp3')
//    .then(response => response.arrayBuffer())
//    .then(arrayBuffer => console.log('Received', arrayBuffer))
//    .catch(e => console.log(e));

// This is an object that handles all the audio processing we're going to do
// and internally manages any communication with the audio hardware and the
// resources associated with it
let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1) {

    /*
     * Set up an audio-processing graph
     * Consists of two nodes, one connected to the next
     */
    // Audio buffer source node that reads in the audiobuffer data and 
    // streams it to other nodes
    // Initialises source buffer
    let sourceNode = audioContext.createBufferSource();

    // Create another node for the graph to go through which pans the audio
    let pannerNode = audioContext.createStereoPanner();

    // Give it the audio buffer
    sourceNode.buffer = audioBuffer;

    // Set loop flag
    sourceNode.loop = true;

    // Set loop starting point
    sourceNode.loopStart = 3;
    sourceNode.loopEnd = 3.85;

    // Set the play back speed
    sourceNode.playbackRate.value = rate;

    // Pan the node
    pannerNode.pan.value = pan;

    // The Audio context's built in audioDestinationnode which makes sound
    // audible on machine speakers
    // Connect the buffers
    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);

    // Start the sound with offset to start at the loops starting point
    // First arg - when to start playing - 0 = immediately
    // second arg- start time offset
    sourceNode.start(0, 3);

};
/*
 * To play we need to create a buffer source
 * this is an object that knows how to play back an audio buffer
 * we give it the bugger we have, connect it, and start it
 * the result that we can hear the sound play from the browser window
 */
fetch('yup.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        // pan -1 all way left, 0 centre, 1 right
        startLoop(audioBuffer, -1);

        // Rate is a multipler, ie rate = 2 is twice as fast
        // introduction slighty faster rate on one of the panned loops introduces phase shift
        startLoop(audioBuffer,  1, 1.2);
    })
    .catch(e => console.log(e));

console.log("It's gonna rain");
