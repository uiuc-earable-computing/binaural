// Keep track of all loaded buffers.
var BUFFERS = {};
// Page-wide audio context.
var context = null;

// An object to track the buffers to load {name: path}
var BUFFERS_TO_LOAD = {
    spkr1: 'src/crossfade/1378_sph1_mimo_sagrnn.wav',
    spkr2: 'src/crossfade/1378_sph2_mimo_sagrnn.wav',
    spkr1_mono: 'src/crossfade/1378_sph1_mimo_sagrnn_mono.wav',
    spkr2_mono: 'src/crossfade/1378_sph2_mimo_sagrnn_mono.wav'
};

// Loads all sound samples into the buffers object.
function loadBuffers() {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in BUFFERS_TO_LOAD) {
    var path = BUFFERS_TO_LOAD[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      BUFFERS[name] = buffer;
    }
  });
  bufferLoader.load();
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser");
  }
  loadBuffers();
});
