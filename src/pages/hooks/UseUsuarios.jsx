import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../connectionBD/firebaseConnect";

function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cancelar = onSnapshot(
      collection(db, "usuarios"),
      (snapshot) => {
        const dados = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsuarios(dados);
      }
    );

    return () => cancelar();
  }, []);

  return usuarios;
}
export default useUsuarios;