import  useUsuarios  from "../hooks/UseUsuarios";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../connectionBD/firebaseConnect";
import './ListaUsuarios.css';


function PaginaUsuarios() {
    const usuarios = useUsuarios();
    const navigate = useNavigate();

  async function fazerLogout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <main className="pagina-usuarios">
    <section className="usuarios-card">
      <header className="usuarios-cabecalho">
        <h1>Que bom ver você de volta</h1>
        <span>Usuários cadastrados</span>
      </header>

      <ul className="lista-usuarios">
        {usuarios.map((usuario) => (
          <li className="usuario-item" key={usuario.id}>
            {usuario.Email}
          </li>
        ))}
      </ul>
      <button className="botao-sair" onClick={fazerLogout}>
        Voltar para a tela de login
      </button>
    </section>
  </main>
  );
}
export default PaginaUsuarios;