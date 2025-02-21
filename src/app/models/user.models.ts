// src/app/admin/models/user.models.ts

// 1) DTO pour la création d'un utilisateur
export interface CreateUserDto {
  userNom: string;
  userPrenom: string;
  userEmail: string;
  userTel?: string; // optionnel
  role: string;
  password: string;
  // passwordChanged?: boolean si tu veux...
}

// 2) Entité renvoyée par le backend
export interface Utilisateur {
  userId: number; // ID obligatoire, vient de la BDD
  userNom: string;
  userPrenom: string;
  userEmail: string;
  userTel?: string;
  role: string;
  password: string;
  passwordChanged?: boolean;
}
