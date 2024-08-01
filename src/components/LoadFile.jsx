import { useState, useEffect } from 'preact/hooks';
import { toast } from './Toast'
import * as XLSX from 'xlsx';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const sendDataToApi = async (body) => {
    const response = await fetch('/api/validator.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const res = await response.json();
    return res
  };

  const formatFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
          header: (header) => decodeURIComponent(header)
        });
  
        // Envía el JSON a la API aquí
        sendDataToApi(jsonData).then((res) => {
          if (res.status) {
            toast('Archivo validado correctamente 🥳', 'success');
          } else {
            toast('Revisa tu correo 📫', 'error');
          }
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }
  useEffect(() => {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('dropzone-file');

    fileInput.addEventListener('change', (event) => {
      const files = event.target.files;
      if (files!== null && files.length > 0) {
        formatFile(files[0]);
      }
    });

    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files!== null && files.length > 0) {
        formatFile(files[0]);
      }
    });
  }, []);
  
  return (
    <>
      <div class="flex items-center justify-center w-full p-17">
        <label id="dropzone" for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Haz click aqui para cargar</span> o arrastra y suelta tu archivo</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

    </>
  );
}

export default FileUploader;