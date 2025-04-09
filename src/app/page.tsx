"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const modules = [
    { id: 1, name: "Dias do ano", path: "/dias-do-ano" },
    { id: 2, name: "Comissões", path: "/comissoes" },
  ];

  return (
    <div className={styles.container}>
      <h2>Bem-vindo ao Playground de Aplicações</h2>
      <p>
        Escolha uma das opções abaixo para ver a aplicação em funcionamento:
      </p>
      <div className={styles.modulesList}>
        {modules.map((module, index) => (
          <div key={index} className={styles.moduleItem}>
            <Link href={module.path} className={styles.moduleLink}>
              {module.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
