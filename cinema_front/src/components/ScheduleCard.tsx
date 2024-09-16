import React, { memo, useState } from "react";
import { Card, Button } from "flowbite-react";
import { useAppDispatch } from "../app/hooks";
import { IScheduledMovie } from "../types";
import { bookSeat } from "../api/bookingAPI";
import { useNavigate } from "react-router-dom";

interface ScheduleCardProps {
  schedule: IScheduledMovie;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    column: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSeatClick = (row: number, column: number, status: boolean) => {
    if (status) {
      setSelectedSeat({ row, column });
    }
  };

  const handleBookSeat = async () => {
    if (selectedSeat) {
      await dispatch(bookSeat({ scheduleId: schedule.id, ...selectedSeat }));
      navigate(0);
    }
  };

  return (
    <Card key={schedule.id} className="p-4">
      <div className="flex items-center mb-4">
        {schedule.movie.poster_url && (
          <img
            src={schedule.movie.poster_url}
            alt={`${schedule.movie.title} Poster`}
            className="w-24 h-32 object-cover mr-4"
          />
        )}
        <div>
          <h4 className="text-lg font-semibold">{schedule.movie.title}</h4>
          <p>Duration: {schedule.movie.duration} minutes</p>
          <p>Showtime: {new Date(schedule.showtime).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {schedule.seats.map((seat, index) => (
          <div
            key={index}
            onClick={() =>
              handleSeatClick(seat.row, seat.column, seat.available)
            }
            className={`w-12 h-8 cursor-pointer flex items-center justify-center text-white ${
              seat.available
                ? selectedSeat &&
                  selectedSeat.row === seat.row &&
                  selectedSeat.column === seat.column
                  ? "bg-blue-500"
                  : "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {`${seat.row}-${seat.column}`}
          </div>
        ))}
      </div>
      {selectedSeat && (
        <Button className="mt-4" onClick={handleBookSeat}>
          Book Selected Seat
        </Button>
      )}
    </Card>
  );
};

export default memo(ScheduleCard);
