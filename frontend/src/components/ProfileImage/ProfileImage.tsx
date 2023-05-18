import { uploads } from "../../utils/config";
import { IData } from "../../utils/type";

interface ProfileImageProps {
  user: IData | null;
}

export function ProfileImage({ user }: ProfileImageProps) {
  return (
    <>
      {user?.profileImage ? (
        <img
          src={`${uploads}/users/${user?.profileImage}`}
          alt={`Foto de ${user?.username}`}
        />
      ) : (
        <img src="./userWithoutPhoto.jpg" alt="Usuário sem foto" />
      )}
    </>
  );
}
