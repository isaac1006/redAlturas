

function crearRedNeuronal() {
    // Paso 1: Obtener valores de entrada
    // Obtén los valores ingresados por el usuario desde los campos de entrada en el formulario HTML.
    const inputCount = parseInt(document.getElementById('inputCount').value);
    const hiddenLayerSize = parseInt(document.getElementById('hiddenLayerSize').value);
    const outputCount = parseInt(document.getElementById('outputCount').value);

    // Paso 2: Definir la configuración de la red neuronal
    // Utiliza los valores de entrada para definir la configuración de la red neuronal.
    const config = {
        inputSize: inputCount,
        hiddenLayers: [hiddenLayerSize],
        outputSize: outputCount
    };

    // Paso 3: Crear la red neuronal
    // Crea una instancia de la red neuronal utilizando la configuración definida.
    const net = new brain.NeuralNetwork(config);

    // Paso 4: Definir datos de entrenamiento
    

        const trainingData = [
           

            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] }
        ];
     

    
   

    // Paso 5: Entrenar la red neuronal
    // Entrena la red neuronal con los datos de entrenamiento definidos anteriormente.
    net.train(trainingData);

    // Paso 6: Evaluar la red neuronal
    // Evalúa la red neuronal con un conjunto de datos de entrada específico.
    const output = net.run([1, 0]);
    console.log(output); // Imprimir el resultado

    // Paso 7: Realizar acciones posteriores a la evaluación
    // Puedes agregar más código aquí para realizar acciones adicionales con la red neuronal entrenada.
}

