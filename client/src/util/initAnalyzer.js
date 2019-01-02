let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function initAnalyzer(audio) {
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
  console.log('frame', {context, source, ctx, canvas, fbc_array, analyser, bar_x, bar_width, bar_height});
  ctx.fillStyle = '#14bdf5'; // Color of the bars
  bars = 200;
}

function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  for (var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}

export default initAnalyzer;
