// comun.js

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; 
import { Storage } from 'aws-amplify';


Amplify.configure(awsconfig);

async function iniciarSesion(email, password) {
    try {
        const user = await Auth.signIn(email, password);
        console.log('Usuario autenticado:', user);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

async function registrarUsuario(email, password) {
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        });
        console.log('Usuario registrado:', user);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
}

async function cerrarSesion() {
    try {
        await Auth.signOut();
        console.log('Sesión cerrada');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}


// Subir un archivo
async function uploadFile(file) {
    try {
        const result = await Storage.put(file.name, file, {
            contentType: file.type
        });
        console.log('Archivo subido:', result);
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }
}

// Obtener archivos
async function listFiles() {
    try {
        const files = await Storage.list('');
        console.log('Archivos en S3:', files);
    } catch (error) {
        console.error('Error al listar archivos:', error);
    }
}


// Función para alternar el menú de navegación
function alternarMenu() {
    const menu = document.querySelector('nav');
    menu.classList.toggle('activo');
}

// Event listener para alternar menú
document.addEventListener('DOMContentLoaded', () => {
    const botonMenu = document.querySelector('.boton-menu');
    if (botonMenu) {
        botonMenu.addEventListener('click', alternarMenu);
    }
});

