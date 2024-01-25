package gc.roomreservation.model;

import gc.roomreservation.api.ReservationResponse;
import gc.roomreservation.auth.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Reservation
{
	@Id
	@GeneratedValue
	private Long reservationId;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	private String roomName;
	private LocalDateTime startTime;
	private LocalDateTime endTime;

	protected Reservation() {}

	public Reservation(User user, String roomName, LocalDateTime startTime, LocalDateTime endTime)
	{
		this.user = user;
		this.roomName = roomName;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	public ReservationResponse mapToResponse()
	{
		return new ReservationResponse(this.reservationId, this.user.mapToResponse(), this.roomName,
				this.startTime, this.endTime);
	}
}
