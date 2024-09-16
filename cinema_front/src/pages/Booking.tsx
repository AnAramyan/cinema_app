import { FC, memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchScheduleDetails } from "../api/scheduleAPI";
import { clearSchedule } from "../features/scheduleSlice";
import ScheduleCard from "../components/ScheduleCard";

const Booking: FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const dispatch = useAppDispatch();
  const { currentSchedule, loading, error } = useAppSelector(
    (state) => state.schedule
  );

  useEffect(() => {
    if (scheduleId) {
      dispatch(fetchScheduleDetails(Number(scheduleId)));
      return () => {
        dispatch(clearSchedule());
      };
    }
  }, [dispatch, scheduleId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!currentSchedule) return <p>No schedule data available.</p>;

  return (
    <div>
      <ScheduleCard schedule={currentSchedule} />
    </div>
  );
};

export default memo(Booking);
