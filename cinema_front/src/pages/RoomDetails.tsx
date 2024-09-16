import { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import { Spinner, Alert } from "flowbite-react";
import { fetchRoomDetails } from "../api/roomsAPI";
import MovieList from "../components/MovieList";

const RoomDetails: FC = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const {
    room,
    loading: roomLoading,
    error: roomError,
  } = useAppSelector((state) => state.rooms);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomDetails(parseInt(roomId)));
    }
  }, [dispatch, roomId]);

  return (
    <div className="p-4">
      {roomLoading ? (
        <Spinner color="info" />
      ) : (
        <>
          {roomError && <Alert color="failure">{roomError}</Alert>}
          {room && (
            <div>
              <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
              <p>
                Seats: {room.seats_row} rows x {room.seats_column} columns
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-4">
                Scheduled Movies:
              </h3>
              <MovieList schedules={room.schedules} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(RoomDetails);
