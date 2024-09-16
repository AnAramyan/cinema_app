import { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchRooms } from "../api/roomsAPI";
import { Spinner } from "flowbite-react";
import RoomList from "../components/RoomList";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { rooms, loading, error } = useAppSelector((state) => state.rooms);
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        {loading && <Spinner color="info" />}
        {error && <p className="text-red-500">{error}</p>}
        <RoomList rooms={rooms} />
      </div>
    </div>
  );
};
export default memo(Home);
