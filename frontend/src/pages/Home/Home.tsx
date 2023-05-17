import { useSelector } from "react-redux";
import styles from "./Home.module.css";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPhotos } from "../../slices/photoSlice";
import { IData, IPhoto } from "../../utils/type";
import { Photo } from "../../components/Photo/Photo";
import { Photos } from "../../components/Photos/Photos";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { getTimeStamp } from "../../utils/getTimeStamp";
import { getAllUsers } from "../../slices/usersSlices";

export function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { users } = useSelector((state: RootState) => state.users);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const { photos, loading } = useSelector((state: RootState) => state.photo);

  useEffect(() => {
    dispatch(getAllPhotos());
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="center">
      {photos.map((photo: IPhoto) => (
        <Photos photo={photo} allUsers={users} key={photo._id} />
      ))}
    </div>
  );
}
