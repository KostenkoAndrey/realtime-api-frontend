class PCMSenderProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input[0]) {
      // Отправляем PCM данные в главный поток
      this.port.postMessage(input[0]);
    }
    return true;
  }
}

registerProcessor('pcm-sender', PCMSenderProcessor);
