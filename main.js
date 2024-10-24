import { EMFJS, RTFJS, WMFJS } from 'rtf.js';

const stringToArrayBuffer=(string) =>{
    const buffer = new ArrayBuffer(string.length);
    const bufferView = new Uint8Array(buffer);
    for (let i = 0; i < string.length; i++) {
        bufferView[i] = string.charCodeAt(i);
    }
    return buffer;
}

const renderRTF=(rtfContent) =>{
    RTFJS.loggingEnabled(false);
    WMFJS.loggingEnabled(false);
    EMFJS.loggingEnabled(false);

    const doc = new RTFJS.Document(stringToArrayBuffer(rtfContent));

    const meta = doc.metadata();
    console.log(meta,'meta')
    doc.render().then(function(htmlElements) {
        const outputDiv = document.getElementById('rtf-output');
        outputDiv.innerHTML = ''; // Limpiar el contenido anterior
        htmlElements.forEach(element => {
            outputDiv.appendChild(element); // Insertar el HTML convertido
        });
    }).catch(error => {
        console.error("Error rendering RTF:", error);
        document.getElementById('rtf-output').innerText = "Error rendering RTF document.";
    });
}

const handleFileUpload=(event) =>{
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const rtfContent = e.target.result;
            renderRTF(rtfContent);
        };
        reader.readAsText(file);
    }
}

window.onload = function() {
    document.getElementById('file-input').addEventListener('change', handleFileUpload);
};
