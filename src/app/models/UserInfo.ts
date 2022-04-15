type UserInfo = {
  nom: string;
  prenom: string;
  email: string;
  pathPhoto: string | undefined | null;
  groups: string[];
};

export default UserInfo;
