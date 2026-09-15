import { db, auth } from "/src/connectionBD/firebaseConnect.js";
import {addDoc, collection} from "firebase/firestore"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import {useState} from 'react'
import './Login.css'

import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

function Login (){
    const [erros, setErros] = useState({});
    const [formulario, setFormulario] = useState({
        email: '',
        senha: '',
    })

const navigate = useNavigate();

async function AdicionarUsuario(){
    const novosErros = {}

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailValido.test(formulario.email)){
        novosErros.email = "* Digite um email válido";
    }

    if (formulario.senha.length < 6) {
        novosErros.senha = "* A senha deve ter pelo menos 6 caracteres.";
    }

    if (Object.keys(novosErros).length > 0) {
    setErros(novosErros)
    return
    }
setErros({});

try{
    const credencial = await createUserWithEmailAndPassword(
      auth,
      formulario.email,
      formulario.senha
    );
     await addDoc(collection(db, "usuarios"), {
      Email: credencial.user.email,
      uid: credencial.user.uid,
    });
    await signOut(auth);

     setFormulario({
      email: "",
      senha: "",
    });
    navigate("/", { replace: true });
    toast.success("Usuário cadastrado com sucesso!");
}catch(error){
     console.error(error);

    if (error.code === "auth/weak-password") {
      toast.error("A senha é muito fraca.");
    } else if (error.code === "auth/email-already-in-use") {
      toast.error("Este e-mail já está em uso.");
    } else {
      toast.error("Erro ao cadastrar usuário.");
    }
  }
}
async function FazendoLogin(){
    try {
    await signInWithEmailAndPassword(auth, formulario.email, formulario.senha)
    .then((value)=>{
    console.log('usuário logado com sucesso!!');
    console.log(value)
    setFormulario({
        email: '',
        senha: ''
    })
    })

    toast.success('Seja bem-vindo!');
    navigate('/usuarios')

    } catch (error) {
    toast.error("Email ou senha incorretos");
    console.error(error);
    }
}

    return(
        <>
        <section className='container-login'> 
        <div className='card-login'>
            <h1 className='titulo-login'>Login de Usuário</h1>
            <div className='campo-login'>
                <label htmlFor="email">Email:</label>
                <input
                id="email"
                type="email"
                placeholder="Digite seu Email"
                value={formulario.email}
                onChange={(e)=> setFormulario({...formulario, email: e.target.value})}
                />
                <span className='erro'>{erros.email || "\u00A0"}</span>
                 
            </div>
            <div className='campo-login'>
                <label htmlFor="senha">Senha</label>
                <input
                id="senha"
                type="password"
                placeholder="Digite sua Senha"
                value={formulario.senha}
                onChange={(e)=> setFormulario({...formulario, senha: e.target.value})}
                />
                <span className='erro'>{erros.senha || "\u00A0"}</span>
                
            </div>
            <button className='btn-login' onClick={FazendoLogin}>Entrar</button>
            <br/>
            <button className='btn-criar-conta' onClick={AdicionarUsuario}>Criar conta</button>

        </div>
        </section>
     </>
    )
}

export default Login