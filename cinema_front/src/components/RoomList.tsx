import { FC, memo } from "react";
import { IRoom } from "../types";
import { Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RoomList: FC<{ rooms: IRoom[] }> = ({ rooms }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id} className="p-4">
            <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
            <p>
              Seats: {room.seats_row} rows x {room.seats_column} columns
            </p>
            <Button
              onClick={() => navigate(`/room/${room.id}/schedules`)}
              className="mt-4"
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
};

export default memo(RoomList);
