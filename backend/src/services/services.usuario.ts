import Usuario from "../models/model.usuario";

interface UsuarioData {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role?: string;

}

export const crearUsuarioService = async (data: UsuarioData)=>{
// Validar si el email ya existe
    const existe = await Usuario.findOne({ email: data.email });
    if (existe) {
        throw new Error("El email ya está registrado");
    }


    const nuevoUsuario = new Usuario();
    return await nuevoUsuario.save();
};
