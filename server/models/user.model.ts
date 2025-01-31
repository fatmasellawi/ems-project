import { db } from "./index.d.ts";
// Déclaration de l'interface User
export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

export class UserModel {
  // Méthode statique pour récupérer tous les utilisateurs
  static getAllUsers(callback: (err: NodeJS.ErrnoException | null, result: User[] | null) => void): void {
    const query = 'SELECT * FROM users';
    db.query(query, (err: NodeJS.ErrnoException | null, result: User[] | null) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result); // Typé en tant qu'User[]
      }
    });
  }

  // Méthode statique pour récupérer un utilisateur par son ID
  static getUserById(id: number, callback: (err: NodeJS.ErrnoException | null, result: User | null) => void): void {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err: NodeJS.ErrnoException | null, result: User[] | null) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result ? result[0] : null); // Typé en tant qu'User
      }
    });
  }

  // Méthode statique pour créer un utilisateur
  static createUser(name: string, email: string, mobile: string, callback: (err: NodeJS.ErrnoException | null, result: User | null) => void): void {
    const query = 'INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)';
    db.query(query, [name, email, mobile], (err: NodeJS.ErrnoException | null, result: any) => { // Result typé en fonction de l'insert
      if (err) {
        callback(err, null);
      } else {
        const newUser: User = { id: result.insertId, name, email, mobile };
        callback(null, newUser);
      }
    });
  }

  // Méthode statique pour mettre à jour un utilisateur
  static updateUser(id: number, name: string, email: string, mobile: string, callback: (err: NodeJS.ErrnoException | null, result: User | null) => void): void {
    const query = 'UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?';
    db.query(query, [name, email, mobile, id], (err: NodeJS.ErrnoException | null, result: any) => { // Result typé en fonction de l'update
      if (err) {
        callback(err, null);
      } else {
        const updatedUser: User = { id, name, email, mobile };
        callback(null, updatedUser);
      }
    });
  }

  // Méthode statique pour supprimer un utilisateur
  static deleteUser(id: number, callback: (err: NodeJS.ErrnoException | null, result: { id: number } | null) => void): void {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err: NodeJS.ErrnoException | null, result: any) => { // Result typé pour suppression
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id });
      }
    });
  }
}
