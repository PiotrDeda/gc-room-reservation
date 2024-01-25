package gc.roomreservation.api;

import gc.roomreservation.auth.api.ProfileResponse;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@SuppressWarnings("ClassCanBeRecord")
public class ReservationResponse
{
	long reservationId;
	ProfileResponse user;
	String roomName;
	LocalDateTime startTime;
	LocalDateTime endTime;
}
