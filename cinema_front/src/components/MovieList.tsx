import { FC, memo } from "react";
import { IScheduledMovie } from "../types";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const MovieList: FC<{ schedules: IScheduledMovie[] }> = ({ schedules }) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-4">
            <div className="flex items-center">
              {schedule.movie.poster_url && (
                <img
                  src={schedule.movie.poster_url}
                  alt={`${schedule.movie.title} Poster`}
                  className="w-16 h-24 object-cover mr-4"
                />
              )}
              <div>
                <h4 className="text-lg font-semibold">
                  {schedule.movie.title}
                </h4>
                <p>Duration: {schedule.movie.duration} minutes</p>
                <p>Showtime: {new Date(schedule.showtime).toLocaleString()}</p>
                <Link to={`/schedule/${schedule.id}/booking`}>
                  <Button className="mt-4">Book Now</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default memo(MovieList);
