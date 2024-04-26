
   var altitudes= [];
    var altitudesMedidas=[];
    var contAltitudes = 0;
    var contadoPerdidas=[];
    var altitud;
    var promedioAltitudes;
    var output;
    const botonSubmit = document.getElementById("botonPredecir");

    // Función para validar el ingreso de datos
    // Función para validar datos de entrada
    function validarDatosEntrada(valor) {
        if (isNaN(valor) || valor <= 0) {
            return false;
        }
        return true;
    }

    function entrenarRedNeuronal() {
        // validacion datos de ingreso //
        altitud = parseFloat(document.getElementById("altitud").value);

        if (!isNaN(altitud)) {
            // 1 cargo los valores de altura a mis array
            altitudesMedidas.push(altitud);
            // calcular el prmedio de altitudes implementado ciclo for //
            let contMayorDeCinco=0;
            let contMenorDeCinco=0;
            let sumaAltitudesMenores = 0;
            let sumaAltitudesMayores = 0;
            //2  calcular el promedio // 
            altitudesMedidas.forEach(altitud => {
                if (altitud < 5) {
                    contMenorDeCinco++;
                    sumaAltitudesMenores += altitud;
                    asignarTextoElemento("promMenor", sumaAltitudesMenores/contMenorDeCinco);
                } else {
                    contMayorDeCinco++;
                    sumaAltitudesMayores += altitud;
                    asignarTextoElemento("promMayor", sumaAltitudesMayores/contMayorDeCinco);
                }
            });
            //3 manejo de datos de datos de entrenamiento red neuronal //
            // numero de entradas de ingreso red neural //
            const datosEntrenamiento = [];

           
            // Generar datos de entrenamiento
            // Definir el rango de valores de tus datos (mínimo y máximo)
            const minAltura = 0; // Valor mínimo posible
            const maxAltura = 12; // Valor máximo posible (según tu ejemplo)
        // Generar datos de entrenamiento
         
            // Iterar sobre tus altitudes medidas y normalizarlas
            for (let i = 0; i < altitudesMedidas.length - 1; i++) {
                const alturaActual = altitudesMedidas[i];
                const alturaSiguiente = altitudesMedidas[i + 1];
                
                // Normalizar las alturas medidas
                const alturaActualNormalizada = (alturaActual - minAltura) / (maxAltura - minAltura);
                const alturaSiguienteNormalizada = (alturaSiguiente - minAltura) / (maxAltura - minAltura);
                
                // Agregar las alturas normalizadas al conjunto de datos de entrenamiento
                const entrada = [alturaActualNormalizada]; // La entrada es la altura medida en el momento actual
                const salida = [alturaSiguienteNormalizada]; // La salida es la altura medida en el siguiente momento
                
                datosEntrenamiento.push({ input: entrada, output: salida });
            }

            // Mostrar entradas y salidas de los datos de entrenamiento en la consola
            console.log("Entradas y salidas de los datos de entrenamiento:");
            datosEntrenamiento.forEach(dato => {
                console.log("Entrada:", dato.input);
                console.log("Salida:", dato.output);
            });
            //4 configuracion de la red neuronal //
            
            const config = {
                inputSize: 1,
                hiddenLayers: [2],
                outputSize: 1
            };
            
             // Crear la red neuronal //
             const net = new brain.NeuralNetwork(config);

            // Entrenar la red neuronal con los datos de entrenamiento
            const opcionesEntrenamiento = {
                learningRate: 0.1, // Tasa de aprendizaje
                iterations: 200 // Número máximo de iteraciones de entrenamiento
            };

            net.train(datosEntrenamiento, opcionesEntrenamiento);

                    // Predicción de la próxima altura
            if (altitudesMedidas.length > 0) {
                // Obtener la última altura medida
                const ultimaAlturaMedida = altitudesMedidas[altitudesMedidas.length - 1];
                
                // Hacer la predicción de la próxima altura solo si hay más de una altura medida
                if (altitudesMedidas.length > 1) {
                    // Hacer la predicción de la próxima altura
                    const proximaAlturaNormalizada = net.run([ultimaAlturaMedida])[0];
                    
                    // Desnormalizar la predicción para obtener el valor original
                    const proximaAltura = proximaAlturaNormalizada * (maxAltura - minAltura) + minAltura;
                    
                    // Imprimir la predicción en la consola
                    console.log("Predicción de la próxima altura:", proximaAltura);
                }
            }

        } else {
            alert("Por favor ingresa números válidos.");
        } 
    }
    function prediccion(net) {
        // Obtener los valores del formulario
        const alturaAnterior = parseFloat(document.getElementById('altitud2').value);
        const alturaNueva = parseFloat(document.getElementById('altitudReal2').value);
    
        // Crear la entrada para la predicción
        const entradaPrueba = { input: { altitudAnterior: alturaAnterior, altitudNueva: alturaNueva } };
    
        // Utilizar la red neuronal para hacer la predicción
        const resultadoPrediccion = net.run(entradaPrueba);
        console.log(resultadoPrediccion);
    }
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault();
        validarIngreso();
    });

    function calcularPromedio(valores) {
        let suma = 0;
        for (let i = 0; i < valores.length; i++) {
            suma += valores[i];
        }
        return suma / valores.length;
    }

    function asignarTextoElemento(elementoId, texto) {
        const elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.textContent = texto;
        } else {
            console.error("El elemento con ID " + elementoId + " no se encontró.");
        }
    }
   