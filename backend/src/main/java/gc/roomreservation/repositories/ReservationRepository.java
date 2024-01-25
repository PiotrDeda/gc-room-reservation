package gc.roomreservation.repositories;

import gc.roomreservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>
{
	List<Reservation> findAllByUser_UserId(Long userId);

	List<Reservation> findAllByStartTimeBetween(LocalDateTime startTime, LocalDateTime endTime);
}
